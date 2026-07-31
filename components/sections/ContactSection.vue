<template>
  <section
    id="contact"
    class="modern-section flex flex-col justify-center py-14 md:py-20"
  >
    <div class="container mx-auto px-4 flex-1 flex items-center">
      <div class="max-w-xl mx-auto w-full">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 gradient-text text-center"
        >
          {{ messages.contact.title }}
        </h2>
        <p
          class="text-base md:text-lg text-text-secondary mb-6 md:mb-8 text-center"
        >
          {{ messages.contact.intro }}
        </p>

        <form
          class="space-y-4"
          @submit.prevent="submit"
        >
          <!-- Honeypot: keep hidden from users, leave empty for spam protection -->
          <div class="absolute -left-[9999px] opacity-0" aria-hidden="true">
            <label :for="honeypotId">{{ messages.contact.spamProtectionLabel }}</label>
            <input
              :id="honeypotId"
              v-model="form.honeypot"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <div>
            <label for="contact-name" class="block text-sm font-medium text-text-primary mb-1">
              {{ messages.contact.nameLabel }}
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              maxlength="200"
              autocomplete="name"
              class="w-full px-4 py-3 rounded-lg bg-background-tertiary border border-border-primary text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              :placeholder="messages.contact.nameLabel"
              :aria-invalid="errors.name ? 'true' : undefined"
              :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            />
            <p
              v-if="errors.name"
              id="contact-name-error"
              class="mt-1 text-sm text-red-400"
              role="alert"
            >
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label for="contact-email" class="block text-sm font-medium text-text-primary mb-1">
              {{ messages.contact.emailLabel }}
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              maxlength="254"
              autocomplete="email"
              class="w-full px-4 py-3 rounded-lg bg-background-tertiary border border-border-primary text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              :placeholder="messages.contact.emailLabel"
              :aria-invalid="errors.email ? 'true' : undefined"
              :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            />
            <p
              v-if="errors.email"
              id="contact-email-error"
              class="mt-1 text-sm text-red-400"
              role="alert"
            >
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="contact-topic" class="block text-sm font-medium text-text-primary mb-1">
              {{ messages.contact.topicLabel }}
            </label>
            <input
              id="contact-topic"
              v-model="form.topic"
              type="text"
              maxlength="200"
              autocomplete="off"
              class="w-full px-4 py-3 rounded-lg bg-background-tertiary border border-border-primary text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              :placeholder="messages.contact.topicLabel"
            />
          </div>

          <div>
            <label for="contact-message" class="block text-sm font-medium text-text-primary mb-1">
              {{ messages.contact.messageLabel }}
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              maxlength="5000"
              rows="4"
              class="w-full px-4 py-3 rounded-lg bg-background-tertiary border border-border-primary text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-y"
              :placeholder="messages.contact.messageLabel"
              :aria-invalid="errors.message ? 'true' : undefined"
              :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            />
            <p
              v-if="errors.message"
              id="contact-message-error"
              class="mt-1 text-sm text-red-400"
              role="alert"
            >
              {{ errors.message }}
            </p>
          </div>

          <ClientOnly>
            <div
              v-if="turnstileSiteKey"
              class="flex flex-col items-center gap-2"
            >
              <ContactTurnstileWidget
                ref="turnstileRef"
                v-model="turnstileToken"
                :site-key="turnstileSiteKey"
                theme="dark"
              />
              <p
                v-if="errors.turnstile"
                id="contact-turnstile-error"
                class="text-sm text-red-400"
                role="alert"
              >
                {{ errors.turnstile }}
              </p>
            </div>
            <p
              v-else
              class="text-sm text-amber-400 text-center"
              role="alert"
            >
              {{ messages.contact.turnstileUnavailable }}
            </p>
          </ClientOnly>

          <div
            class="rounded-lg p-4 min-h-[3rem] flex items-center justify-center"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <p v-if="status === 'success'" class="text-emerald-400 text-sm md:text-base">
              {{ messages.contact.successMessage }}
            </p>
            <p v-else-if="status === 'error'" class="text-red-400 text-sm md:text-base" role="alert">
              {{ statusMessage || messages.contact.errorMessage }}
            </p>
            <p v-else-if="status === 'not-configured'" class="text-amber-400 text-sm md:text-base" role="alert">
              {{ messages.contact.notConfiguredMessage }}
            </p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full text-base md:text-lg px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            :disabled="loading || !turnstileSiteKey"
          >
            <span v-if="loading">{{ messages.contact.submittingLabel }}</span>
            <span v-else>{{ messages.contact.submitLabel }}</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "~/composables/useI18n";

const { locale, messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);
const runtimeConfig = useRuntimeConfig();
const turnstileSiteKey = computed(
  () => String(runtimeConfig.public.turnstileSiteKey || "").trim(),
);

const honeypotId = "contact-website-url";

const form = reactive({
  name: "",
  email: "",
  topic: "",
  message: "",
  honeypot: "",
});

const errors = reactive<{
  name?: string;
  email?: string;
  message?: string;
  turnstile?: string;
}>({
  name: undefined,
  email: undefined,
  message: undefined,
  turnstile: undefined,
});

const loading = ref(false);
const status = ref<"idle" | "success" | "error" | "not-configured">("idle");
const statusMessage = ref("");
const turnstileToken = ref("");
const turnstileRef = ref<{ reset: () => void } | null>(null);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resetTurnstile() {
  turnstileToken.value = "";
  turnstileRef.value?.reset();
}

function validate(): boolean {
  errors.name = undefined;
  errors.email = undefined;
  errors.message = undefined;
  errors.turnstile = undefined;

  const name = form.name.trim();
  if (!name) {
    errors.name = messages.value.contact.validationNameRequired;
  }
  const email = form.email.trim();
  if (!email) {
    errors.email = messages.value.contact.validationEmailRequired;
  } else if (!emailRegex.test(email)) {
    errors.email = messages.value.contact.validationEmailInvalid;
  }
  const message = form.message.trim();
  if (!message) {
    errors.message = messages.value.contact.validationMessageRequired;
  }
  if (!turnstileToken.value) {
    errors.turnstile = messages.value.contact.validationTurnstileRequired;
  }

  return !errors.name && !errors.email && !errors.message && !errors.turnstile;
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

async function submit() {
  if (loading.value) return;

  status.value = "idle";
  statusMessage.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.topic.trim(),
        message: form.message.trim(),
        turnstileToken: turnstileToken.value,
        honeypot: form.honeypot,
        locale: locale.value,
      },
    });

    status.value = "success";
    form.name = "";
    form.email = "";
    form.topic = "";
    form.message = "";
    form.honeypot = "";
  } catch (err: unknown) {
    const fetchError = err as {
      statusCode?: number;
      status?: number;
      data?: { statusCode?: number };
    };
    const statusCode =
      fetchError?.statusCode ??
      fetchError?.status ??
      fetchError?.data?.statusCode;
    status.value = mapErrorStatus(statusCode);
    statusMessage.value = messageForStatusCode(statusCode);
  } finally {
    loading.value = false;
    resetTurnstile();
  }
}
</script>
