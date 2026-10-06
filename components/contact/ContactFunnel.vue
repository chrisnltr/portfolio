<template>
  <div class="funnel">
    <div class="funnel__progress" :aria-label="messages.funnel.progressLabel">
      <div class="funnel__progress-meta">
        <span>{{ stepLabel }}</span>
        <span>{{ progressPercent }}%</span>
      </div>
      <div
        class="funnel__progress-track"
        role="progressbar"
        :aria-valuenow="progressPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="funnel__progress-fill"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>

    <div class="funnel__stage">
      <Transition :name="transitionName" mode="out-in">
        <div
          :key="step"
          class="funnel__step"
          role="group"
          :aria-labelledby="`funnel-step-${step}-title`"
        >
          <template v-if="step === 1">
            <h2 :id="`funnel-step-${step}-title`" class="funnel__title">
              {{ messages.funnel.needTitle }}
            </h2>
            <p class="funnel__hint">{{ messages.funnel.needHint }}</p>
            <div class="funnel__options">
              <button
                v-for="id in needOptions"
                :key="id"
                type="button"
                class="funnel__option"
                :class="{ 'is-selected': selectedNeeds.includes(id) }"
                :aria-pressed="selectedNeeds.includes(id)"
                @click="toggleNeed(id)"
              >
                <span class="funnel__option-check" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.25 7.1 5.85 9.7 10.75 4.3"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span class="funnel__option-copy">
                  <span class="funnel__option-label">
                    {{ messages.funnel.needs[id].label }}
                  </span>
                  <span
                    v-if="messages.funnel.needs[id].hint"
                    class="funnel__option-hint"
                  >
                    {{ messages.funnel.needs[id].hint }}
                  </span>
                </span>
              </button>
            </div>
            <p v-if="stepError" class="funnel__error" role="alert">{{ stepError }}</p>
          </template>

          <template v-else-if="step === 2">
            <h2 :id="`funnel-step-${step}-title`" class="funnel__title">
              {{ messages.funnel.budgetTitle }}
            </h2>
            <div class="funnel__options">
              <button
                v-for="id in budgetOptions"
                :key="id"
                type="button"
                class="funnel__option funnel__option--compact"
                :class="{ 'is-selected': budget === id }"
                :aria-pressed="budget === id"
                @click="budget = id"
              >
                <span class="funnel__option-radio" aria-hidden="true" />
                <span class="funnel__option-label">
                  {{ messages.funnel.budgets[id].label }}
                </span>
              </button>
            </div>
            <p v-if="stepError" class="funnel__error" role="alert">{{ stepError }}</p>
          </template>

          <template v-else>
            <h2 :id="`funnel-step-${step}-title`" class="funnel__title">
              {{ messages.funnel.detailsTitle }}
            </h2>

            <form class="funnel__form" @submit.prevent="submit" @focusin="onFormStart">
              <div
                class="h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
                style="clip: rect(0, 0, 0, 0); clip-path: inset(50%); position: absolute"
                aria-hidden="true"
              >
                <label :for="honeypotId">{{ messages.contact.spamProtectionLabel }}</label>
                <input
                  :id="honeypotId"
                  v-model="form.honeypot"
                  type="text"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="funnel__field">
                <label for="funnel-name" class="funnel__label">
                  {{ messages.contact.nameLabel }}
                </label>
                <input
                  id="funnel-name"
                  v-model="form.name"
                  type="text"
                  required
                  maxlength="200"
                  autocomplete="name"
                  class="funnel__input"
                  :class="{ 'is-invalid': errors.name }"
                  :disabled="loading"
                  :aria-invalid="errors.name ? 'true' : undefined"
                  @input="clearError('name')"
                />
                <p v-if="errors.name" class="funnel__error" role="alert">{{ errors.name }}</p>
              </div>

              <div class="funnel__field">
                <label for="funnel-email" class="funnel__label">
                  {{ messages.contact.emailLabel }}
                </label>
                <input
                  id="funnel-email"
                  v-model="form.email"
                  type="email"
                  required
                  maxlength="254"
                  autocomplete="email"
                  class="funnel__input"
                  :class="{ 'is-invalid': errors.email }"
                  :disabled="loading"
                  :aria-invalid="errors.email ? 'true' : undefined"
                  @input="clearError('email')"
                />
                <p v-if="errors.email" class="funnel__error" role="alert">{{ errors.email }}</p>
              </div>

              <div class="funnel__field">
                <label for="funnel-phone" class="funnel__label">
                  {{ messages.contact.phoneLabel }}
                  <span class="funnel__optional">({{ messages.contact.optionalHint }})</span>
                </label>
                <input
                  id="funnel-phone"
                  v-model="form.phone"
                  type="tel"
                  maxlength="40"
                  autocomplete="tel"
                  class="funnel__input"
                  :disabled="loading"
                />
              </div>

              <div class="funnel__field">
                <label for="funnel-message" class="funnel__label">
                  {{ messages.funnel.messageOptionalLabel }}
                </label>
                <textarea
                  id="funnel-message"
                  v-model="form.message"
                  maxlength="2000"
                  rows="3"
                  class="funnel__input funnel__input--area"
                  :disabled="loading"
                />
              </div>

              <ClientOnly>
                <div v-if="turnstileSiteKey" class="funnel__turnstile">
                  <ContactTurnstileWidget
                    ref="turnstileRef"
                    v-model="turnstileToken"
                    :site-key="turnstileSiteKey"
                    theme="light"
                  />
                  <p v-if="errors.turnstile" class="funnel__error" role="alert">
                    {{ errors.turnstile }}
                  </p>
                </div>
                <p v-else-if="isDev" class="funnel__notice" role="status">
                  {{ messages.contact.turnstileUnavailable }}
                </p>
              </ClientOnly>

              <div
                class="funnel__privacy"
                :class="{ 'is-invalid': errors.privacy }"
              >
                <span class="funnel__checkbox-field">
                  <input
                    id="funnel-privacy"
                    v-model="privacyAccepted"
                    type="checkbox"
                    class="funnel__checkbox"
                    :disabled="loading"
                    :aria-invalid="errors.privacy ? 'true' : undefined"
                    @change="clearError('privacy')"
                  >
                  <span class="funnel__checkbox-ui" aria-hidden="true">
                    <svg viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3.25 7.1 5.85 9.7 10.75 4.3"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </span>
                <label for="funnel-privacy">
                  {{ messages.contact.privacyConsentLabel }}
                  <NuxtLink to="/datenschutz" class="funnel__privacy-link">
                    {{ messages.footer.datenschutz }}
                  </NuxtLink>
                </label>
              </div>
              <p v-if="errors.privacy" class="funnel__error" role="alert">{{ errors.privacy }}</p>
              <p v-if="statusMessage" class="funnel__error" role="alert">{{ statusMessage }}</p>
            </form>
          </template>
        </div>
      </Transition>

      <div class="funnel__actions">
        <button
          v-if="step > 1"
          type="button"
          class="funnel__back"
          :disabled="loading"
          @click="goBack"
        >
          ← {{ messages.funnel.backLabel }}
        </button>
        <button
          v-if="step < totalSteps"
          type="button"
          class="btn-cta funnel__next"
          @click="goNext"
        >
          <span>{{ messages.funnel.nextLabel }}</span>
          <span aria-hidden="true">→</span>
        </button>
        <button
          v-else
          type="button"
          class="btn-cta funnel__next"
          :disabled="!canSubmit"
          :aria-disabled="!canSubmit ? 'true' : undefined"
          @click="submit"
        >
          <span v-if="loading" class="funnel__spinner" aria-hidden="true" />
          <span>{{ loading ? messages.contact.submittingLabel : messages.funnel.submitLabel }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useI18n } from "~/composables/useI18n";
import {
  FUNNEL_TOTAL_STEPS,
  funnelBudgetOptions,
  funnelNeedOptions,
  type FunnelBudgetId,
  type FunnelNeedId,
} from "~/data/funnel";

const emit = defineEmits<{
  "update:step": [step: number];
}>();

const { locale, messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const { track } = useAnalytics();
const isDev = import.meta.dev;

const turnstileSiteKey = computed(
  () => String(runtimeConfig.public.turnstileSiteKey || "").trim(),
);

const totalSteps = FUNNEL_TOTAL_STEPS;
const step = ref(1);

watch(
  step,
  (value) => {
    emit("update:step", value);
  },
  { immediate: true },
);
const direction = ref<"forward" | "back">("forward");
const stepError = ref("");
const formStarted = ref(false);
const privacyAccepted = ref(false);
const loading = ref(false);
const statusMessage = ref("");
const turnstileToken = ref("");
const turnstileRef = ref<{ reset: () => void } | null>(null);

const selectedNeeds = ref<FunnelNeedId[]>([]);
const budget = ref<FunnelBudgetId | "">("");
const projectQueryPrefillDone = ref(false);

const needOptions = funnelNeedOptions;
const budgetOptions = funnelBudgetOptions;

function applyWebsiteProjectPrefill() {
  if (projectQueryPrefillDone.value) return;
  const projekt = String(route.query.projekt || "").toLowerCase();
  if (projekt !== "website") return;

  projectQueryPrefillDone.value = true;
  // Only seed an empty selection; never overwrite a user choice.
  if (selectedNeeds.value.length === 0) {
    selectedNeeds.value = ["website"];
  }
}

watch(
  () => String(route.query.projekt || "").toLowerCase(),
  () => {
    applyWebsiteProjectPrefill();
  },
  { immediate: true },
);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  honeypot: "",
});

const errors = reactive<{
  name?: string;
  email?: string;
  turnstile?: string;
  privacy?: string;
}>({});

const honeypotId = "funnel-website-url";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const progressPercent = computed(() =>
  Math.round((step.value / totalSteps) * 100),
);

const stepLabel = computed(() =>
  messages.value.funnel.stepOf
    .replace("{current}", String(step.value))
    .replace("{total}", String(totalSteps)),
);

const transitionName = computed(() =>
  direction.value === "forward" ? "funnel-slide-next" : "funnel-slide-back",
);

const canSubmit = computed(
  () =>
    privacyAccepted.value &&
    Boolean(turnstileSiteKey.value) &&
    !loading.value,
);

watch(turnstileToken, (token) => {
  if (token) clearError("turnstile");
});

watch(privacyAccepted, (accepted) => {
  if (accepted) clearError("privacy");
});

function clearError(key: keyof typeof errors) {
  errors[key] = undefined;
}

function toggleNeed(id: FunnelNeedId) {
  stepError.value = "";
  const index = selectedNeeds.value.indexOf(id);
  if (index >= 0) {
    selectedNeeds.value = selectedNeeds.value.filter((item) => item !== id);
    return;
  }
  selectedNeeds.value = [...selectedNeeds.value, id];
}

function validateStep(): boolean {
  stepError.value = "";
  if (step.value === 1 && selectedNeeds.value.length === 0) {
    stepError.value = messages.value.funnel.validationNeedRequired;
    return false;
  }
  if (step.value === 2 && !budget.value) {
    stepError.value = messages.value.funnel.validationBudgetRequired;
    return false;
  }
  return true;
}

function goNext() {
  if (!validateStep()) return;
  direction.value = "forward";
  step.value = Math.min(step.value + 1, totalSteps);
  track("cta_click", {
    location: "contact-funnel",
    service: `step-${step.value}`,
  });
}

function goBack() {
  direction.value = "back";
  stepError.value = "";
  step.value = Math.max(step.value - 1, 1);
}

function onFormStart() {
  if (formStarted.value) return;
  formStarted.value = true;
  track("contact_form_start", { location: "contact-funnel" });
}

function resetTurnstile() {
  turnstileToken.value = "";
  turnstileRef.value?.reset();
}

function validateDetails(): boolean {
  errors.name = undefined;
  errors.email = undefined;
  errors.turnstile = undefined;
  errors.privacy = undefined;

  if (!form.name.trim()) errors.name = messages.value.contact.validationNameRequired;
  const email = form.email.trim();
  if (!email) errors.email = messages.value.contact.validationEmailRequired;
  else if (!emailRegex.test(email)) errors.email = messages.value.contact.validationEmailInvalid;
  if (!privacyAccepted.value) errors.privacy = messages.value.contact.validationPrivacyRequired;
  if (turnstileSiteKey.value && !turnstileToken.value) {
    errors.turnstile = messages.value.contact.validationTurnstileRequired;
  }

  return !errors.name && !errors.email && !errors.turnstile && !errors.privacy;
}

function buildMessageBody(): string {
  const needLabels = selectedNeeds.value
    .map((id) => messages.value.funnel.needs[id]?.label || id)
    .join(", ");
  const budgetLabel = budget.value
    ? messages.value.funnel.budgets[budget.value]?.label || budget.value
    : "";

  const lines = [
    "Erstgespräch-Anfrage",
    `Bedarf: ${needLabels}`,
    `Budget: ${budgetLabel}`,
  ];

  if (form.message.trim()) {
    lines.push("", form.message.trim());
  }

  return lines.join("\n");
}

function messageForStatusCode(statusCode?: number): string {
  if (statusCode === 429) return messages.value.contact.rateLimitedMessage;
  if (statusCode === 403) return messages.value.contact.turnstileFailedMessage;
  if (statusCode === 503) return messages.value.contact.notConfiguredMessage;
  return messages.value.contact.errorMessage;
}

async function submit() {
  if (loading.value || !canSubmit.value) return;
  statusMessage.value = "";
  if (!validateDetails()) return;

  loading.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: buildMessageBody(),
        needs: selectedNeeds.value,
        budget: budget.value,
        turnstileToken: turnstileToken.value,
        honeypot: form.honeypot,
        locale: locale.value,
        formType: "erstgespraech-funnel",
      },
    });
    // Fire only after the API accepted the inquiry — never on click or failure.
    // Google Ads conversion is dispatched via track() → trackLeadConversion (marketing consent + configured IDs).
    track("contact_form_submit_success", {
      location: "contact-funnel",
      service: "erstgespraech",
      ...(selectedNeeds.value.includes("website")
        ? { project_type: "website" }
        : {}),
    });
    await router.push("/danke");
  } catch (err: unknown) {
    const fetchError = err as {
      statusCode?: number;
      status?: number;
      data?: { statusCode?: number };
    };
    const statusCode =
      fetchError?.statusCode ?? fetchError?.status ?? fetchError?.data?.statusCode;
    statusMessage.value = messageForStatusCode(statusCode);
    track("contact_form_submit_error", {
      location: "contact-funnel",
      status: String(statusCode || "unknown"),
    });
  } finally {
    loading.value = false;
    resetTurnstile();
  }
}
</script>

<style scoped>
.funnel {
  --funnel-field: #ffffff;
  --funnel-border: var(--color-border-strong);
  --funnel-muted: var(--color-text-muted);
  --funnel-subtle: var(--color-text-subtle);
  --funnel-error: #dc2626;
  width: 100%;
  display: grid;
  gap: 1rem;
}

.funnel__progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--funnel-subtle);
}

.funnel__progress-track {
  height: 3px;
  border-radius: 999px;
  background: rgba(18, 26, 38, 0.08);
  overflow: hidden;
}

.funnel__progress-fill {
  height: 100%;
  border-radius: inherit;
  background: #2f66ff;
  transition: width 0.35s var(--ease-out);
}

.funnel__stage {
  display: grid;
  gap: 1.1rem;
}

.funnel__step {
  display: grid;
  gap: 0.55rem;
  align-content: start;
}

.funnel__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.8vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--color-text);
}

.funnel__hint {
  margin: 0;
  font-size: 0.88rem;
  color: var(--funnel-subtle);
}

.funnel__options {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.15rem;
}

.funnel__option {
  appearance: none;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  border: 1px solid var(--funnel-border);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: 12px;
  padding: 0.78rem 0.95rem;
  font: inherit;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(18, 26, 38, 0.04);
  transition:
    border-color 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out),
    transform 0.16s var(--ease-out),
    box-shadow 0.2s var(--ease-out);
}

.funnel__option--compact {
  padding: 0.7rem 0.95rem;
}

.funnel__option:hover {
  border-color: rgba(47, 102, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(47, 102, 255, 0.08);
}

.funnel__option.is-selected {
  border-color: rgba(47, 102, 255, 0.55);
  background: rgba(47, 102, 255, 0.08);
  box-shadow: 0 0 0 1px rgba(47, 102, 255, 0.12);
}

.funnel__option-check,
.funnel__option-radio {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 6px;
  border: 1px solid var(--funnel-border);
  background: var(--color-bg);
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  transition:
    border-color 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out);
}

.funnel__option-radio {
  border-radius: 999px;
}

.funnel__option-check svg {
  width: 0.72rem;
  height: 0.72rem;
  opacity: 0;
}

.funnel__option.is-selected .funnel__option-check {
  border-color: transparent;
  background: #2f66ff;
}

.funnel__option.is-selected .funnel__option-check svg {
  opacity: 1;
}

.funnel__option.is-selected .funnel__option-radio {
  border-color: var(--color-accent);
  box-shadow: inset 0 0 0 4px var(--color-accent);
  background: #fff;
}

.funnel__option-copy {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.funnel__option-label {
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.funnel__option-hint {
  font-size: 0.84rem;
  color: var(--funnel-subtle);
}

.funnel__option:focus-visible,
.funnel__back:focus-visible,
.funnel__next:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

.funnel__form {
  display: grid;
  gap: 0.95rem;
}

.funnel__field {
  min-width: 0;
}

.funnel__label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
}

.funnel__optional {
  font-weight: 500;
  color: var(--funnel-subtle);
}

.funnel__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.78rem 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--funnel-field);
  border: 1px solid var(--funnel-border);
  color: var(--color-text);
  font: inherit;
  font-size: 1rem;
  caret-color: var(--color-accent);
}

.funnel__input--area {
  resize: vertical;
  min-height: 5.5rem;
}

.funnel__input:focus,
.funnel__input:focus-visible {
  outline: none;
  border-color: rgba(47, 102, 255, 0.45);
  box-shadow: 0 0 0 2px rgba(47, 102, 255, 0.12);
}

.funnel__input.is-invalid {
  border-color: var(--funnel-error);
}

.funnel__input:disabled {
  opacity: 0.58;
  cursor: not-allowed;
}

.funnel__error {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: var(--funnel-error);
}

.funnel__notice {
  margin: 0;
  font-size: 0.82rem;
  color: var(--funnel-subtle);
}

.funnel__turnstile {
  display: grid;
  gap: 0.35rem;
  justify-items: start;
  max-width: 100%;
  overflow-x: auto;
}

.funnel__privacy {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--funnel-muted);
  border-radius: var(--radius-sm);
  padding: 0.15rem;
}

.funnel__privacy.is-invalid {
  outline: 1px solid rgba(248, 113, 113, 0.5);
  outline-offset: 2px;
}

.funnel__checkbox-field {
  position: relative;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.15rem;
}

.funnel__checkbox {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}

.funnel__checkbox-ui {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid var(--funnel-border);
  background: var(--funnel-field);
  color: #fff;
  pointer-events: none;
}

.funnel__checkbox-ui svg {
  width: 0.72rem;
  height: 0.72rem;
  opacity: 0;
}

.funnel__checkbox:checked + .funnel__checkbox-ui {
  border-color: transparent;
  background: #2f66ff;
}

.funnel__checkbox:checked + .funnel__checkbox-ui svg {
  opacity: 1;
}

.funnel__privacy-link {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.funnel__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.funnel__back {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--funnel-muted);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 550;
  cursor: pointer;
  padding: 0.65rem 0.2rem;
  min-height: 2.75rem;
}

.funnel__back:hover:not(:disabled) {
  color: var(--color-text);
}

.funnel__back:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.funnel__next {
  margin-left: auto;
  min-width: min(100%, 11.5rem);
}

.funnel__next:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.funnel__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(248, 250, 252, 0.35);
  border-top-color: var(--color-on-accent);
  border-radius: 50%;
  animation: funnel-spin 0.7s linear infinite;
}

@keyframes funnel-spin {
  to {
    transform: rotate(360deg);
  }
}

.funnel-slide-next-enter-active,
.funnel-slide-next-leave-active,
.funnel-slide-back-enter-active,
.funnel-slide-back-leave-active {
  transition:
    opacity 0.2s var(--ease-out),
    transform 0.2s var(--ease-out);
}

.funnel-slide-next-enter-from {
  opacity: 0;
  transform: translateX(0.85rem);
}

.funnel-slide-next-leave-to {
  opacity: 0;
  transform: translateX(-0.6rem);
}

.funnel-slide-back-enter-from {
  opacity: 0;
  transform: translateX(-0.85rem);
}

.funnel-slide-back-leave-to {
  opacity: 0;
  transform: translateX(0.6rem);
}

@media (prefers-reduced-motion: reduce) {
  .funnel__progress-fill,
  .funnel__option,
  .funnel-slide-next-enter-active,
  .funnel-slide-next-leave-active,
  .funnel-slide-back-enter-active,
  .funnel-slide-back-leave-active {
    transition: none;
  }

  .funnel-slide-next-enter-from,
  .funnel-slide-next-leave-to,
  .funnel-slide-back-enter-from,
  .funnel-slide-back-leave-to {
    transform: none;
  }

  .funnel__spinner {
    animation: none;
    border-color: var(--color-on-accent);
  }
}

@media (max-width: 639px) {
  .funnel__next {
    width: 100%;
    margin-left: 0;
  }

  .funnel__actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .funnel__back {
    text-align: center;
  }
}

@media (max-height: 820px) {
  .funnel {
    gap: 0.75rem;
  }

  .funnel__stage {
    gap: 0.85rem;
  }

  .funnel__step {
    gap: 0.4rem;
  }

  .funnel__options {
    gap: 0.35rem;
  }

  .funnel__option,
  .funnel__option--compact {
    padding: 0.62rem 0.85rem;
    border-radius: 10px;
  }

  .funnel__option-label {
    font-size: 0.92rem;
  }

  .funnel__option-hint {
    font-size: 0.78rem;
  }

  .funnel__actions {
    gap: 0.5rem;
  }
}
</style>
