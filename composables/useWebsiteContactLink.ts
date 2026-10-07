import { computed } from "vue";
import { contactPath } from "~/data/navigation";
import { websiteContactQuery } from "~/utils/marketingAttribution";

/**
 * NuxtLink target for the website landing → contact funnel transition.
 * Preserves allowlisted gclid/gbraid/wbraid/UTM params from the current route.
 */
export function useWebsiteContactLink() {
  const route = useRoute();

  const contactTo = computed(() => ({
    path: contactPath,
    query: websiteContactQuery(
      route.query as Record<string, string | string[] | undefined>,
    ),
  }));

  return { contactTo, contactPath };
}
