import { describe, expect, it } from "vitest";
import {
  buildFirstTouchAttribution,
  captureMarketingAttribution,
  clearMarketingAttribution,
  extractAttributionFromSearchParams,
  isAllowedAttributionKey,
  MARKETING_ATTRIBUTION_STORAGE_KEY,
  mergeAttributionIntoQuery,
  readMarketingAttribution,
  websiteContactQuery,
} from "../utils/marketingAttribution";

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

describe("marketing attribution", () => {
  it("only allows the documented attribution keys", () => {
    expect(isAllowedAttributionKey("gclid")).toBe(true);
    expect(isAllowedAttributionKey("utm_source")).toBe(true);
    expect(isAllowedAttributionKey("email")).toBe(false);
    expect(isAllowedAttributionKey("referrer")).toBe(false);
  });

  it("extracts allowlisted query params and ignores others", () => {
    const params = new URLSearchParams({
      gclid: "Cj0KCQjw",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "tracking_test",
      email: "leak@example.com",
      message: "secret",
      foo: "bar",
    });
    expect(extractAttributionFromSearchParams(params)).toEqual({
      gclid: "Cj0KCQjw",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "tracking_test",
    });
  });

  it("stores referrer host only (never a full URL with query)", () => {
    const built = buildFirstTouchAttribution({
      pathname: "/website-erstellen-lassen",
      referrer: "https://www.google.com/search?q=chris+email%40x.de",
      search: "?gclid=abc",
    });
    expect(built.initial_referrer_host).toBe("www.google.com");
    expect(built.initial_landing_path).toBe("/website-erstellen-lassen");
    expect(JSON.stringify(built)).not.toContain("email");
    expect(JSON.stringify(built)).not.toContain("search?q");
  });

  it("keeps first-touch values and does not overwrite on later capture", () => {
    const storage = memoryStorage();
    captureMarketingAttribution(
      {
        gclid: "first",
        utm_source: "google",
        initial_landing_path: "/website-erstellen-lassen",
      },
      storage,
    );
    captureMarketingAttribution(
      {
        gclid: "second",
        utm_source: "newsletter",
        utm_campaign: "later",
        initial_landing_path: "/kontakt",
      },
      storage,
    );

    expect(readMarketingAttribution(storage)).toEqual({
      gclid: "first",
      utm_source: "google",
      utm_campaign: "later",
      initial_landing_path: "/website-erstellen-lassen",
    });
  });

  it("clears stored attribution on revoke", () => {
    const storage = memoryStorage();
    captureMarketingAttribution({ gclid: "x", utm_medium: "cpc" }, storage);
    expect(storage.getItem(MARKETING_ATTRIBUTION_STORAGE_KEY)).toBeTruthy();
    clearMarketingAttribution(storage);
    expect(readMarketingAttribution(storage)).toEqual({});
    expect(storage.getItem(MARKETING_ATTRIBUTION_STORAGE_KEY)).toBeNull();
  });

  it("preserves Ads/UTM params when building the contact funnel query", () => {
    expect(
      websiteContactQuery({
        gclid: "click1",
        utm_source: "google",
        utm_medium: "cpc",
        projekt: "ignored-overwrite-base",
        email: "nope@example.com",
      }),
    ).toEqual({
      projekt: "website",
      gclid: "click1",
      utm_source: "google",
      utm_medium: "cpc",
    });

    expect(
      mergeAttributionIntoQuery(
        { projekt: "website" },
        new URLSearchParams("gbraid=gb1&wbraid=wb1&utm_content=manual_test"),
      ),
    ).toEqual({
      projekt: "website",
      gbraid: "gb1",
      wbraid: "wb1",
      utm_content: "manual_test",
    });
  });
});
