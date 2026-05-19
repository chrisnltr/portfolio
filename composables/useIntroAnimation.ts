import { computed, watch, onMounted } from "vue";
import { useRoute } from "#app";
import { INTRO_SESSION_KEY } from "~/data/introAnimation";
import type { IntroPhase } from "~/types/intro";

const HOME_PATH_RE = /^\/(de|en)\/?$/;

export const useIntroAnimation = () => {
  const route = useRoute();
  const phase = useState<IntroPhase>("intro-phase", () => "checking");
  const replayKey = useState("intro-replay-key", () => 0);
  const isManualReplay = useState("intro-manual-replay", () => false);

  const isHomePage = computed(
    () => HOME_PATH_RE.test(route.path) || route.path === "/",
  );

  const hasPlayedIntro = (): boolean => {
    if (!import.meta.client) return false;
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  };

  const evaluateIntro = () => {
    if (!import.meta.client) return;

    if (hasPlayedIntro() || !isHomePage.value) {
      phase.value = "done";
      return;
    }

    isManualReplay.value = false;
    phase.value = "playing";
  };

  const showMainApp = computed(() => {
    if (phase.value === "done") return true;
    if (phase.value === "hold") return true;
    // Beim Namensklick: Startseite während Animation + Outro sichtbar lassen
    if (phase.value === "playing" && isManualReplay.value) return true;
    if (phase.value === "checking" && !isHomePage.value) return true;
    return false;
  });

  const completeIntro = () => {
    isManualReplay.value = false;
    if (import.meta.client) {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      document.body.style.overflow = "";
    }
    phase.value = "done";
  };

  const startOutroHold = () => {
    if (!import.meta.client) return;
    phase.value = "hold";
    document.body.style.overflow = "";
  };

  const skipIntro = () => {
    isManualReplay.value = false;
    completeIntro();
  };

  const replayIntro = () => {
    if (!import.meta.client || !isHomePage.value) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    isManualReplay.value = true;
    replayKey.value += 1;
    phase.value = "playing";
    document.body.style.overflow = "hidden";
  };

  onMounted(evaluateIntro);

  watch(
    () => route.path,
    () => {
      if (!import.meta.client || hasPlayedIntro()) return;

      if (isHomePage.value && phase.value === "done") {
        isManualReplay.value = false;
        phase.value = "playing";
      }
    },
  );

  return {
    phase,
    replayKey,
    isManualReplay,
    isHomePage,
    showMainApp,
    completeIntro,
    startOutroHold,
    skipIntro,
    replayIntro,
  };
};
