import { describe, expect, it } from "vitest";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  DEFAULT_CATEGORIES,
} from "../types/consent";
import {
  buildConsentCookie,
  createConsentState,
  isConsentExpired,
  isConsentValid,
  parseConsentCookieValue,
  readConsentCookieFromDocument,
  serializeConsentState,
} from "../utils/consentStorage";

describe("consent storage", () => {
  it("defaults to necessary-only categories", () => {
    expect(DEFAULT_CATEGORIES).toEqual({
      necessary: true,
      statistics: false,
      marketing: false,
    });
  });

  it("creates a decision with version and timestamp (accept all)", () => {
    const state = createConsentState({ statistics: true, marketing: true });
    expect(state.version).toBe(CONSENT_VERSION);
    expect(state.categories.necessary).toBe(true);
    expect(state.categories.statistics).toBe(true);
    expect(state.categories.marketing).toBe(true);
    expect(Number.isNaN(Date.parse(state.decidedAt))).toBe(false);
  });

  it("creates a reject-all decision with optional categories disabled", () => {
    const state = createConsentState({ statistics: false, marketing: false });
    expect(state.categories.statistics).toBe(false);
    expect(state.categories.marketing).toBe(false);
  });

  it("treats first visit (null) as undecided", () => {
    expect(isConsentValid(null)).toBe(false);
  });

  it("keeps a valid decision after reload via parse/serialize", () => {
    const state = createConsentState({ statistics: true, marketing: false });
    const raw = serializeConsentState(state);
    const parsed = parseConsentCookieValue(raw);
    expect(parsed).toEqual(state);
    expect(isConsentValid(parsed)).toBe(true);
  });

  it("invalidates when consent version changes", () => {
    const state = createConsentState({ statistics: true, marketing: true });
    const outdated = {
      ...state,
      version: "0-legacy",
    };
    expect(isConsentValid(outdated)).toBe(false);
  });

  it("invalidates expired consent (older than 12 months)", () => {
    const state = createConsentState({ statistics: true, marketing: false });
    const thirteenMonthsAgo = Date.now() - 1000 * 60 * 60 * 24 * 400;
    expect(isConsentExpired(state, thirteenMonthsAgo + 1)).toBe(false);
    const aged = {
      ...state,
      decidedAt: new Date(thirteenMonthsAgo).toISOString(),
    };
    expect(isConsentExpired(aged, Date.now())).toBe(true);
    expect(isConsentValid(aged)).toBe(false);
  });

  it("supports individual selection (statistics without marketing)", () => {
    const off = createConsentState({ statistics: false, marketing: false });
    const on = createConsentState({ statistics: true, marketing: false });
    expect(off.categories.statistics).toBe(false);
    expect(on.categories.statistics).toBe(true);
    expect(on.categories.marketing).toBe(false);
  });

  it("builds a first-party cookie without storing IP or user-agent", () => {
    const state = createConsentState({ statistics: false, marketing: false });
    const cookie = buildConsentCookie(state, false);
    expect(cookie.startsWith(`${CONSENT_COOKIE_NAME}=`)).toBe(true);
    expect(cookie).toContain("Max-Age=");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie.toLowerCase()).not.toContain("user-agent");
    expect(cookie).not.toMatch(/\b\d{1,3}(\.\d{1,3}){3}\b/);
  });

  it("reads consent from a document cookie string", () => {
    const state = createConsentState({ statistics: true, marketing: true });
    const encoded = encodeURIComponent(serializeConsentState(state));
    const cookieString = `foo=bar; ${CONSENT_COOKIE_NAME}=${encoded}; baz=1`;
    expect(readConsentCookieFromDocument(cookieString)).toEqual(state);
  });

  it("rejects malformed cookie payloads", () => {
    expect(parseConsentCookieValue("{not-json")).toBeNull();
    expect(
      parseConsentCookieValue(
        JSON.stringify({
          version: CONSENT_VERSION,
          decidedAt: "x",
          categories: { necessary: true },
        }),
      ),
    ).toBeNull();
  });

  it("rejects legacy v1 cookies missing marketing", () => {
    expect(
      parseConsentCookieValue(
        JSON.stringify({
          version: "1",
          decidedAt: new Date().toISOString(),
          categories: { necessary: true, statistics: true },
        }),
      ),
    ).toBeNull();
  });
});

describe("consent decision scenarios", () => {
  it("Erstbesuch: only necessary defaults apply", () => {
    expect(isConsentValid(null)).toBe(false);
    expect(DEFAULT_CATEGORIES.statistics).toBe(false);
    expect(DEFAULT_CATEGORIES.marketing).toBe(false);
  });

  it("Alle ablehnen: optional categories stay false", () => {
    const rejected = createConsentState({ statistics: false, marketing: false });
    expect(rejected.categories.necessary).toBe(true);
    expect(rejected.categories.statistics).toBe(false);
    expect(rejected.categories.marketing).toBe(false);
    expect(isConsentValid(rejected)).toBe(true);
  });

  it("Alle akzeptieren: statistics and marketing enabled", () => {
    const accepted = createConsentState({ statistics: true, marketing: true });
    expect(accepted.categories.statistics).toBe(true);
    expect(accepted.categories.marketing).toBe(true);
  });

  it("Widerruf: saving false disables optional categories", () => {
    const revoked = createConsentState({ statistics: false, marketing: false });
    expect(revoked.categories.statistics).toBe(false);
    expect(revoked.categories.marketing).toBe(false);
  });

  it("Neue Consent-Version: banner must reappear (invalid stored state)", () => {
    const stored = {
      version: "old",
      decidedAt: new Date().toISOString(),
      categories: {
        necessary: true as const,
        statistics: true,
        marketing: true,
      },
    };
    expect(isConsentValid(stored)).toBe(false);
  });
});
