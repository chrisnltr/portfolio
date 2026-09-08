<template>
  <section
    id="contact"
    class="contact"
    :class="{
      'contact--stacked': layout === 'stacked',
    }"
  >
    <div
      class="container-page"
      :class="layout === 'stacked' ? 'contact__stacked' : 'contact__grid'"
    >
      <div v-if="layout === 'split'" class="contact__intro">
        <p class="contact__label">{{ resolvedLabel }}</p>
        <h2 class="contact__title">{{ resolvedTitle }}</h2>
        <p class="contact__body">{{ resolvedIntro }}</p>
        <p v-if="supportingIntro" class="contact__supporting">{{ supportingIntro }}</p>

        <div v-if="outcomes?.length" class="contact__outcomes">
          <h3 class="contact__outcomes-title">{{ outcomesTitle }}</h3>
          <ol class="contact__outcomes-list">
            <li v-for="(item, index) in outcomes" :key="item">
              <span class="contact__outcomes-num" aria-hidden="true">
                {{ String(index + 1).padStart(2, "0") }}
              </span>
              <span>{{ item }}</span>
            </li>
          </ol>
        </div>

        <div v-if="showContactMeta" class="contact__meta">
          <p class="contact__name">{{ profile.name }}</p>
          <p>{{ messages.contact.roleLine }}</p>
          <p>{{ profile.location }}</p>
        </div>

        <div class="contact__links">
          <ul v-if="trustPoints?.length" class="contact__trust-points">
            <li v-for="point in trustPoints" :key="point">{{ point }}</li>
          </ul>
          <a :href="`mailto:${profile.email}`" class="contact__email" @click="onEmail">
            {{ profile.email }}
          </a>
          <p v-if="showContactMeta" class="contact__note">{{ resolvedPersonalReply }}</p>
        </div>
      </div>

      <div v-else class="contact__stacked-intro">
        <h2 class="contact__stacked-title">{{ resolvedTitle }}</h2>
        <p class="contact__stacked-body">{{ resolvedIntro }}</p>
      </div>

      <BorderGlow
        class="contact-form-glow"
        :class="{
          'contact-form-glow--success': status === 'success',
          'contact-form-glow--error': status === 'error' || status === 'not-configured',
        }"
        :border-radius="formBorderRadius"
        :glow-intensity="glowIntensity"
        :edge-sensitivity="48"
        :glow-radius="10"
        :cone-spread="14"
        :background-color="glowBackgroundColor"
        :glow-color="glowColor"
        :colors="glowColors"
        :fill-opacity="0"
      >
        <form
          class="contact-form"
          :class="{
            'contact-form--loading': loading,
            'contact-form--success': status === 'success',
            'contact-form--error': status === 'error' || status === 'not-configured',
          }"
          :aria-busy="loading ? 'true' : undefined"
          @submit.prevent="submit"
          @focusin="onFormStart"
        >
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

        <div class="contact-form__row">
          <div class="contact-form__field">
            <label for="contact-name" class="field-label">
              {{ messages.contact.nameLabel }}
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              maxlength="200"
              autocomplete="name"
              class="field"
              :class="{ 'field--invalid': errors.name }"
              :disabled="loading || status === 'success'"
              :aria-invalid="errors.name ? 'true' : undefined"
              :aria-describedby="errors.name ? 'contact-name-error' : undefined"
              @input="clearError('name')"
            />
            <p v-if="errors.name" id="contact-name-error" class="field-error" role="alert">
              {{ errors.name }}
            </p>
          </div>

          <div class="contact-form__field">
            <label for="contact-email" class="field-label">
              {{ messages.contact.emailLabel }}
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              maxlength="254"
              autocomplete="email"
              class="field"
              :class="{ 'field--invalid': errors.email }"
              :disabled="loading || status === 'success'"
              :aria-invalid="errors.email ? 'true' : undefined"
              :aria-describedby="errors.email ? 'contact-email-error' : undefined"
              @input="clearError('email')"
            />
            <p v-if="errors.email" id="contact-email-error" class="field-error" role="alert">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div class="contact-form__field">
          <label for="contact-phone" class="field-label">
            {{ messages.contact.phoneLabel }}
            <span class="field-label__optional">({{ messages.contact.optionalHint }})</span>
          </label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            maxlength="40"
            autocomplete="tel"
            class="field"
            :disabled="loading || status === 'success'"
          />
        </div>

        <div class="contact-form__field">
          <label for="contact-message" class="field-label">
            {{ messages.contact.messageLabel }}
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            maxlength="5000"
            rows="5"
            class="field field--area"
            :class="{ 'field--invalid': errors.message }"
            :disabled="loading || status === 'success'"
            :aria-invalid="errors.message ? 'true' : undefined"
            :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            @input="clearError('message')"
          />
          <p v-if="errors.message" id="contact-message-error" class="field-error" role="alert">
            {{ errors.message }}
          </p>
        </div>

        <ClientOnly>
          <div v-if="turnstileSiteKey" class="contact-form__turnstile">
            <ContactTurnstileWidget
              ref="turnstileRef"
              v-model="turnstileToken"
              :site-key="turnstileSiteKey"
              :theme="turnstileTheme"
            />
            <p v-if="errors.turnstile" class="field-error" role="alert">
              {{ errors.turnstile }}
            </p>
          </div>
          <p v-else-if="isDev" class="contact-form__notice" role="status">
            {{ messages.contact.turnstileUnavailable }}
          </p>
        </ClientOnly>

        <div
          class="contact-form__privacy"
          :class="{ 'contact-form__privacy--invalid': errors.privacy }"
        >
          <span class="contact-form__checkbox-field">
            <input
              id="contact-privacy"
              v-model="privacyAccepted"
              type="checkbox"
              class="contact-form__checkbox"
              :disabled="loading || status === 'success'"
              :aria-invalid="errors.privacy ? 'true' : undefined"
              :aria-describedby="errors.privacy ? 'contact-privacy-error' : undefined"
              @change="clearError('privacy')"
            >
            <span class="contact-form__checkbox-ui" aria-hidden="true">
              <svg
                class="contact-form__checkbox-icon"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="contact-form__checkbox-check"
                  pathLength="1"
                  d="M3.25 7.1 5.85 9.7 10.75 4.3"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
          <label for="contact-privacy">
            {{ messages.contact.privacyConsentLabel }}
            <NuxtLink :to="privacyPath" class="contact-form__privacy-link">
              {{ privacyLinkLabel }}
            </NuxtLink>
          </label>
        </div>
        <p v-if="errors.privacy" id="contact-privacy-error" class="field-error" role="alert">
          {{ errors.privacy }}
        </p>

        <div
          ref="statusRef"
          class="contact-form__status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p v-if="status === 'success'" class="contact-form__ok">
            {{ messages.contact.successMessage }}
          </p>
          <p v-else-if="status === 'error'" class="field-error" role="alert">
            {{ statusMessage || messages.contact.errorMessage }}
          </p>
          <p v-else-if="status === 'not-configured' && isDev" class="contact-form__notice" role="alert">
            {{ messages.contact.notConfiguredMessage }}
          </p>
        </div>

        <button
          type="submit"
          class="btn-primary contact-form__submit"
          :class="{ 'contact-form__submit--loading': loading }"
          :disabled="!canSubmit"
          :aria-disabled="!canSubmit ? 'true' : undefined"
        >
          <span
            v-if="loading"
            class="contact-form__spinner"
            aria-hidden="true"
          />
          <span v-if="loading">{{ messages.contact.submittingLabel }}</span>
          <span v-else>{{ props.submitLabel ?? messages.contact.submitLabel }}</span>
        </button>
        </form>
      </BorderGlow>

      <p v-if="showEmailFooter && layout === 'stacked'" class="contact__stacked-email">
        <a
          :href="`mailto:${profile.email}`"
          class="text-link"
          @click="onEmail"
        >{{ profile.email }}</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import BorderGlow from "~/components/effects/BorderGlow.vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useI18n } from "~/composables/useI18n";
import { profile } from "~/data/profile";

const props = withDefaults(
  defineProps<{
    label?: string;
    title?: string;
    intro?: string;
    supportingIntro?: string;
    outcomesTitle?: string;
    outcomes?: string[];
    personalReply?: string;
    showContactMeta?: boolean;
    showEmailFooter?: boolean;
    layout?: "split" | "stacked";
    trustPoints?: string[];
    analyticsLocation?: string;
    submitLabel?: string;
  }>(),
  {
    layout: "split",
    showContactMeta: true,
    showEmailFooter: false,
    analyticsLocation: "home-contact",
  },
);

const { locale, messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const { track } = useAnalytics();
const isDev = import.meta.dev;
const turnstileSiteKey = computed(
  () => String(runtimeConfig.public.turnstileSiteKey || "").trim(),
);

const resolvedLabel = computed(
  () => props.label ?? messages.value.contact.label,
);
const resolvedTitle = computed(
  () => props.title ?? messages.value.contact.title,
);
const resolvedIntro = computed(
  () => props.intro ?? messages.value.contact.intro,
);
const resolvedPersonalReply = computed(
  () => props.personalReply ?? messages.value.contact.personalReply,
);

const glowIntensity = computed(() => 0.22);
const glowBackgroundColor = computed(() => "#0d1524");
const glowColor = computed(() => "220 68% 72%");
const glowColors = computed(() => ["#142952", "#2f66ff", "#8eb0ff"]);
const formBorderRadius = computed(() => 14);
const turnstileTheme = computed((): "dark" | "light" => "dark");

const honeypotId = "contact-website-url";
const formStarted = ref(false);
const privacyAccepted = ref(false);
const statusRef = ref<HTMLElement | null>(null);

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
  message?: string;
  turnstile?: string;
  privacy?: string;
}>({});

const loading = ref(false);
const status = ref<"idle" | "success" | "error" | "not-configured">("idle");
const statusMessage = ref("");
const turnstileToken = ref("");
const turnstileRef = ref<{ reset: () => void } | null>(null);

watch(turnstileToken, (token) => {
  if (token) clearError("turnstile");
});

watch(privacyAccepted, (accepted) => {
  if (accepted) clearError("privacy");
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const privacyPath = "/datenschutz";
const privacyLinkLabel = computed(() => messages.value.footer.datenschutz);

const canSubmit = computed(
  () =>
    privacyAccepted.value &&
    Boolean(turnstileSiteKey.value) &&
    !loading.value &&
    status.value !== "success",
);

function onFormStart() {
  if (formStarted.value) return;
  formStarted.value = true;
  track("contact_form_start", { location: props.analyticsLocation });
}

function onEmail() {
  track("email_click", { location: props.analyticsLocation });
}

function clearError(key: keyof typeof errors) {
  errors[key] = undefined;
}

function resetTurnstile() {
  turnstileToken.value = "";
  turnstileRef.value?.reset();
}

function validate(): boolean {
  errors.name = undefined;
  errors.email = undefined;
  errors.message = undefined;
  errors.turnstile = undefined;
  errors.privacy = undefined;

  if (!form.name.trim()) errors.name = messages.value.contact.validationNameRequired;
  const email = form.email.trim();
  if (!email) errors.email = messages.value.contact.validationEmailRequired;
  else if (!emailRegex.test(email)) errors.email = messages.value.contact.validationEmailInvalid;
  if (!form.message.trim()) errors.message = messages.value.contact.validationMessageRequired;
  if (!privacyAccepted.value) errors.privacy = messages.value.contact.validationPrivacyRequired;
  if (turnstileSiteKey.value && !turnstileToken.value) {
    errors.turnstile = messages.value.contact.validationTurnstileRequired;
  }

  return !errors.name && !errors.email && !errors.message && !errors.turnstile && !errors.privacy;
}

function mapErrorStatus(statusCode?: number): "error" | "not-configured" {
  if (statusCode === 503) return "not-configured";
  return "error";
}

function messageForStatusCode(statusCode?: number): string {
  if (statusCode === 429) return messages.value.contact.rateLimitedMessage;
  if (statusCode === 403) return messages.value.contact.turnstileFailedMessage;
  return messages.value.contact.errorMessage;
}

function scrollStatusIntoView() {
  statusRef.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function focusFirstInvalid() {
  const order = [
    ["name", "contact-name"],
    ["email", "contact-email"],
    ["message", "contact-message"],
    ["privacy", "contact-privacy"],
  ] as const;

  for (const [key, id] of order) {
    if (errors[key]) {
      document.getElementById(id)?.focus();
      return;
    }
  }
}

async function submit() {
  if (loading.value || !canSubmit.value) return;
  status.value = "idle";
  statusMessage.value = "";
  if (!validate()) {
    await nextTick();
    focusFirstInvalid();
    scrollStatusIntoView();
    return;
  }

  loading.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        turnstileToken: turnstileToken.value,
        honeypot: form.honeypot,
        locale: locale.value,
      },
    });
    status.value = "success";
    track("contact_form_submit_success", {
      location: props.analyticsLocation,
      service: "contact",
    });
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";
    form.honeypot = "";
    privacyAccepted.value = false;
    await router.push("/danke");

  } catch (err: unknown) {
    const fetchError = err as {
      statusCode?: number;
      status?: number;
      data?: { statusCode?: number };
    };
    const statusCode =
      fetchError?.statusCode ?? fetchError?.status ?? fetchError?.data?.statusCode;
    status.value = mapErrorStatus(statusCode);
    statusMessage.value = messageForStatusCode(statusCode);
    track("contact_form_submit_error", {
      location: props.analyticsLocation,
      status: String(statusCode || "unknown"),
    });
    await nextTick();
    scrollStatusIntoView();
  } finally {
    loading.value = false;
    resetTurnstile();
  }
}
</script>

<style scoped>
.contact {
  --contact-panel: #0d1524;
  --contact-field: #1a2740;
  --contact-field-border: rgba(243, 246, 250, 0.14);
  --contact-panel-border: rgba(243, 246, 250, 0.16);
  --contact-label: #ffffff;
  --contact-text: #e8eef7;
  --contact-muted: #9aa7b8;
  --contact-subtle: #7d8ba0;
  --contact-error: #f87171;
  --contact-error-soft: rgba(248, 113, 113, 0.2);

  position: relative;
  color: var(--color-text);
  padding-block: clamp(3.5rem, 7vw, 6.5rem);
  border-top: 1px solid var(--color-border);
  background:
    radial-gradient(ellipse 80% 55% at 70% 20%, rgba(47, 102, 255, 0.09), transparent 60%),
    radial-gradient(ellipse 55% 45% at 10% 85%, rgba(47, 102, 255, 0.05), transparent 55%),
    linear-gradient(180deg, #0a0e16 0%, var(--color-surface) 48%, #090d14 100%);
}

.contact__grid {
  display: grid;
  gap: clamp(2.25rem, 5.5vw, 4.25rem);
  align-items: start;
}

@media (min-width: 900px) {
  .contact__grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(3.75rem, 7.5vw, 7rem);
  }
}

.contact__intro {
  padding-top: 0.15rem;
}

.contact__label {
  margin: 0 0 0.7rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--contact-subtle);
}

.contact__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 6.5vw, 2.45rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
  max-width: 14ch;
  color: #fff;
  overflow-wrap: anywhere;
}

.contact__body {
  margin: 0.85rem 0 0;
  max-width: 30rem;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--contact-muted);
}

.contact__supporting {
  margin: 0.85rem 0 0;
  max-width: 34rem;
  font-size: 0.98rem;
  line-height: 1.62;
  color: var(--contact-muted);
}

.contact__outcomes {
  margin-top: 1.35rem;
  padding: 1rem 1.05rem;
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--contact-panel-border) 80%, transparent);
  background: color-mix(in srgb, var(--contact-panel) 70%, transparent);
  max-width: 34rem;
}

.contact__outcomes-title {
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--contact-text);
}

.contact__outcomes-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.65rem;
}

.contact__outcomes-list li {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr);
  gap: 0.55rem;
  align-items: start;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--contact-muted);
}

.contact__outcomes-num {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  padding-top: 0.15rem;
}

.contact__meta {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(243, 246, 250, 0.1);
  display: grid;
  gap: 0.2rem;
  font-size: 0.94rem;
  line-height: 1.55;
  color: var(--contact-muted);
}

.contact__meta p {
  margin: 0;
}

.contact__name {
  margin-bottom: 0.15rem;
  font-size: 1rem;
  font-weight: 650;
  color: #fff;
}

.contact__links {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.4rem;
}

.contact__email {
  color: #fff;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.contact__email:hover {
  color: var(--color-accent-hover);
}

.contact__note {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--contact-subtle);
}

.contact__side-link {
  margin-top: 0.45rem;
  color: var(--contact-muted);
  text-decoration: underline;
  text-underline-offset: 0.18em;
  font-size: 0.92rem;
}


.contact__side-link:hover {
  color: #fff;
}

.contact-form-glow {
  width: 100%;
}

.contact-form-glow--success {
  border-color: color-mix(in srgb, var(--color-accent) 42%, rgba(243, 246, 250, 0.16));
}

.contact-form-glow--error {
  border-color: color-mix(in srgb, var(--contact-error) 40%, rgba(243, 246, 250, 0.16));
}

.contact-form {
  position: relative;
  background: transparent;
  color: var(--contact-text);
  border: 0;
  box-shadow: none;
  padding: clamp(1.2rem, 3.2vw, 1.9rem);
  display: grid;
  gap: 1.05rem;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.contact-form--loading {
  pointer-events: none;
}

.contact-form__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.05rem;
}

@media (min-width: 640px) {
  .contact-form__row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.contact-form__field {
  min-width: 0;
}

.field-label {
  display: block;
  margin-bottom: 0.42rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--contact-label);
}

.field-label__optional {
  font-weight: 500;
  color: var(--contact-subtle);
}

.field {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0.78rem 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--contact-field);
  border: 1px solid var(--contact-field-border);
  color: var(--contact-text);
  font: inherit;
  caret-color: var(--color-accent-hover);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.field::placeholder {
  color: var(--contact-subtle);
}

.field--area {
  resize: vertical;
  min-height: 8rem;
}

.field:hover:not(:disabled):not(:focus):not(.field--invalid) {
  border-color: rgba(243, 246, 250, 0.22);
}

.field:focus,
.field:focus-visible {
  outline: none;
  border-color: rgba(47, 102, 255, 0.38);
  box-shadow: 0 0 0 2px rgba(47, 102, 255, 0.12);
}

.field--invalid,
.field[aria-invalid="true"] {
  border-color: var(--contact-error);
  background: color-mix(in srgb, var(--contact-field) 88%, #7f1d1d);
}

.field--invalid:focus,
.field--invalid:focus-visible,
.field[aria-invalid="true"]:focus,
.field[aria-invalid="true"]:focus-visible {
  border-color: var(--contact-error);
  box-shadow: 0 0 0 3px var(--contact-error-soft);
}

.field:disabled {
  opacity: 0.58;
  cursor: not-allowed;
  background: color-mix(in srgb, var(--contact-field) 80%, #000);
}

.field:-webkit-autofill,
.field:-webkit-autofill:hover,
.field:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--contact-text);
  box-shadow: 0 0 0 1000px var(--contact-field) inset;
  transition: background-color 99999s ease-out;
}

.field-error {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: var(--contact-error);
}

.contact-form__notice {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--contact-subtle);
  text-align: left;
}

.contact-form__privacy {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--contact-muted);
  border-radius: var(--radius-sm);
  padding: 0.2rem;
  margin: -0.2rem;
}

.contact-form__privacy--invalid {
  outline: 1px solid rgba(248, 113, 113, 0.5);
  outline-offset: 2px;
}

.contact-form__checkbox-field {
  position: relative;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.22rem;
}

.contact-form__checkbox {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}

.contact-form__checkbox-ui {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid var(--contact-field-border);
  background: var(--contact-field);
  color: #fff;
  pointer-events: none;
  overflow: hidden;
  transform-origin: center;
  transition:
    border-color 0.22s var(--ease-out),
    background-color 0.22s var(--ease-out),
    transform 0.16s var(--ease-out),
    box-shadow 0.22s var(--ease-out);
}

.contact-form__checkbox-ui::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #2f66ff 0%, #1a3a7a 100%);
  opacity: 0;
  transform: scale(0.65);
  transition:
    opacity 0.2s var(--ease-out),
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-form__checkbox-ui::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid rgba(142, 176, 255, 0.55);
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
}

.contact-form__checkbox-icon {
  position: relative;
  z-index: 1;
  width: 0.72rem;
  height: 0.72rem;
}

.contact-form__checkbox-check {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  transition:
    stroke-dashoffset 0.18s ease-in,
    opacity 0.12s ease-in;
}

.contact-form__checkbox:checked + .contact-form__checkbox-ui {
  border-color: rgba(47, 102, 255, 0.55);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 0 0 1px rgba(47, 102, 255, 0.12);
}

.contact-form__checkbox:checked + .contact-form__checkbox-ui::before {
  opacity: 1;
  transform: scale(1);
}

.contact-form__checkbox:checked + .contact-form__checkbox-ui::after {
  animation: contact-checkbox-ring 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-form__checkbox:checked + .contact-form__checkbox-ui .contact-form__checkbox-check {
  stroke-dashoffset: 0;
  opacity: 1;
  transition:
    stroke-dashoffset 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.12s,
    opacity 0.08s ease-out 0.1s;
}

.contact-form__checkbox:active:not(:disabled) + .contact-form__checkbox-ui {
  transform: scale(0.96);
}

.contact-form__checkbox:focus-visible + .contact-form__checkbox-ui {
  outline: 2px solid rgba(47, 102, 255, 0.38);
  outline-offset: 2px;
}

.contact-form__checkbox:disabled + .contact-form__checkbox-ui {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-form__checkbox:disabled {
  cursor: not-allowed;
}

@keyframes contact-checkbox-ring {
  0% {
    opacity: 0.55;
    transform: scale(0.92);
  }

  100% {
    opacity: 0;
    transform: scale(1.55);
  }
}

.contact-form__privacy-link {
  color: #8eb0ff;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.contact-form__privacy-link:hover {
  color: #b5cbff;
}

.contact-form__privacy-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

.contact-form__status {
  min-height: 0;
}

.contact-form__status:has(> :not(:empty)) {
  min-height: 1.25rem;
}

.contact-form__ok {
  margin: 0;
  font-size: 0.9rem;
  color: #8eb0ff;
}

.contact-form__submit {
  width: 100%;
  gap: 0.55rem;
  margin-top: 0.15rem;
  background: var(--color-accent);
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(20, 48, 140, 0.28);
}

.contact-form__submit:hover:not(:disabled) {
  background: var(--color-accent-hover);
  box-shadow: 0 10px 24px rgba(20, 48, 140, 0.34);
}

.contact-form__submit:disabled {
  background: #243352;
  color: rgba(232, 238, 247, 0.42);
  border-color: rgba(243, 246, 250, 0.08);
  box-shadow: none;
  opacity: 1;
  cursor: not-allowed;
  transform: none;
}

.contact-form__submit:disabled:hover {
  background: #243352;
}

.contact-form__submit--loading:not(:disabled) {
  opacity: 0.9;
}

.contact-form__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(248, 250, 252, 0.35);
  border-top-color: #f8fafc;
  border-radius: 50%;
  animation: contact-spin 0.7s linear infinite;
}

@keyframes contact-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 639px) {
  .contact {
    padding-block: 3.25rem;
  }

  .contact__title {
    max-width: none;
    font-size: clamp(1.625rem, 7vw, 1.875rem);
    overflow-wrap: break-word;
  }

  .contact__body {
    font-size: 1rem;
    line-height: 1.6;
  }

  .contact-form {
    padding: 1.05rem 1rem;
    gap: 0.9rem;
  }

  .field {
    padding: 0.82rem 0.85rem;
    font-size: 1rem;
  }

  .contact-form__privacy {
    align-items: flex-start;
    gap: 0.7rem;
    font-size: 0.9rem;
  }

  .contact-form__checkbox-field {
    width: 2.75rem;
    height: 2.75rem;
    margin-top: -0.35rem;
    margin-left: -0.45rem;
    display: grid;
    place-items: center;
  }

  .contact-form__checkbox {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .contact-form__checkbox-ui {
    width: 1.125rem;
    height: 1.125rem;
  }

  .contact-form__status:not(:has(> *)) {
    display: none;
  }

  .contact-form__submit {
    min-height: 48px;
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .field,
  .contact-form,
  .contact-form__submit,
  .contact-form__checkbox-ui,
  .contact-form__checkbox-icon {
    transition: none;
  }

  .contact-form__checkbox:checked + .contact-form__checkbox-ui::after {
    animation: none;
  }

  .contact-form__checkbox:checked + .contact-form__checkbox-ui::before {
    transition: none;
  }

  .contact-form__checkbox:active:not(:disabled) + .contact-form__checkbox-ui {
    transform: none;
  }

  .contact-form__spinner {
    animation: none;
    border-color: #f8fafc;
  }
}

.contact-form__turnstile {
  display: grid;
  gap: 0.4rem;
  justify-items: start;
  max-width: 100%;
  overflow-x: auto;
}

.contact__stacked {
  max-width: 36rem;
  margin-inline: auto;
  display: grid;
  gap: 1.75rem;
}

.contact__stacked-intro {
  text-align: center;
}

.contact__stacked-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.8vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: var(--color-text);
}

.contact__stacked-body {
  margin: 0.75rem 0 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.contact__stacked-email {
  margin: 0;
  text-align: center;
  font-size: 0.92rem;
}

.contact--stacked {
  padding-block: clamp(3.5rem, 7vw, 5.5rem);
}

</style>
