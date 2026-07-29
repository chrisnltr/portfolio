<template>
  <div>
    <LegalHeader />
    <main class="pt-24 pb-14 md:pt-28 md:pb-20 min-h-screen">
      <div class="container mx-auto px-4 md:px-6">
        <article class="max-w-3xl mx-auto modern-section rounded-xl p-6 md:p-10 card-elevated">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Privacy Policy
          </h1>
          <p class="text-text-secondary text-sm mb-8">
            Portfolio website of Chris Leon Noltemeier · Last updated: July 2026
          </p>

          <div class="space-y-6 text-text-primary">
            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">1. Data controller</h2>
              <p class="text-text-secondary leading-relaxed">
                The data controller for this website is:
              </p>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary mt-2">
                Chris Leon Noltemeier<br>
                Bad Essen, Germany<br>
                Email: chris.noltemeier@gmail.com
              </p>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                TODO: Complete the postal address (street, number, ZIP) and have it legally reviewed.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">2. Scope</h2>
              <p class="text-text-secondary leading-relaxed">
                This privacy policy applies to the portfolio website available under this domain
                (professional profile, projects, and contact form). It does not automatically cover
                separate third-party products or other domains (e.g. linked project sites) that publish
                their own notices.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">3. Hosting</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                This website is hosted by:
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Provider:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                <li><strong class="text-text-primary">Purpose:</strong> Providing and delivering the website</li>
                <li><strong class="text-text-primary">Data processed:</strong> e.g. IP address, access time, requested URL, user agent and similar server log data (as processed by the host)</li>
                <li><strong class="text-text-primary">Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest in secure, efficient operation) – TODO: confirm legal basis and DPA/SCC with the operator</li>
                <li><strong class="text-text-primary">Retention:</strong> TODO: confirm current Vercel log retention</li>
                <li><strong class="text-text-primary">Recipients / third country:</strong> Vercel; possible transfers to the USA – TODO: review transfer mechanism</li>
              </ul>
              <p class="text-text-secondary leading-relaxed mt-2">
                Provider privacy notice:
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link"
                >https://vercel.com/legal/privacy-policy</a>
              </p>
            </section>

            <!-- CONSENT-DOCUMENTED TECHNOLOGIES -->
            <section class="rounded-lg border border-accent-400/30 bg-background-tertiary/30 p-4 md:p-5">
              <h2 class="text-xl font-semibold text-text-primary mb-2">
                4. Technologies used (consent and necessary functions)
              </h2>
              <p class="text-text-secondary leading-relaxed mb-4">
                The following technologies are actually used in this project. Optional services are loaded
                only after your consent. You can change your choice anytime via “Privacy settings” in the footer.
              </p>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.1 Language preference (necessary)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Provider:</strong> First-party (this website)</li>
                <li><strong class="text-text-primary">Purpose:</strong> Store the selected language (German/English)</li>
                <li><strong class="text-text-primary">Data / mechanism:</strong> localStorage key <code class="text-accent-400">preferred_locale</code></li>
                <li><strong class="text-text-primary">Legal basis:</strong> Art. 6(1)(f) GDPR and Section 25(2) TDDDG (technically required for the presentation requested by the user) – TODO: confirm legally</li>
                <li><strong class="text-text-primary">Retention:</strong> until deleted by the user or browser storage is cleared</li>
                <li><strong class="text-text-primary">Recipients:</strong> no third-party transfer via this storage</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.2 Consent storage (necessary)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Provider:</strong> First-party (this website)</li>
                <li><strong class="text-text-primary">Purpose:</strong> Store your consent decision (version, timestamp, categories)</li>
                <li><strong class="text-text-primary">Data / mechanism:</strong> first-party cookie <code class="text-accent-400">portfolio_consent</code> (no IP address, no full user agent)</li>
                <li><strong class="text-text-primary">Legal basis:</strong> Art. 6(1)(c)/(f) GDPR and Section 25(2) TDDDG – TODO: confirm legally</li>
                <li><strong class="text-text-primary">Retention:</strong> 12 months</li>
                <li><strong class="text-text-primary">Withdrawal:</strong> via “Privacy settings”; the banner may reappear when required</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.3 Vercel Web Analytics (optional – statistics)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Provider:</strong> Vercel Inc. (see section 3)</li>
                <li><strong class="text-text-primary">Purpose:</strong> Reach and usage statistics (e.g. page views)</li>
                <li><strong class="text-text-primary">Data processed:</strong> technical usage information (e.g. paths); see Vercel’s notices – TODO: confirm data categories against current Vercel docs</li>
                <li><strong class="text-text-primary">Legal basis:</strong> consent under Art. 6(1)(a) GDPR and Section 25(1) TDDDG</li>
                <li><strong class="text-text-primary">Storage / loading:</strong> script loaded only after consent (<code class="text-accent-400">/_vercel/insights/script.js</code> in production)</li>
                <li><strong class="text-text-primary">Retention:</strong> TODO: document Vercel retention</li>
                <li><strong class="text-text-primary">Recipients / third country:</strong> Vercel; possible USA transfers – TODO: review</li>
                <li><strong class="text-text-primary">Withdrawal:</strong> anytime via “Privacy settings” (disable Statistics)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">5. Contact form</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                If you use the contact form, the data you enter (name, email, optional subject, message,
                plus technical spam protection / rate-limiting data on the server) is processed to respond
                to your request.
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Provider (email delivery):</strong> Resend (if configured) and/or Formspree as fallback</li>
                <li><strong class="text-text-primary">Purpose:</strong> handling your inquiry</li>
                <li><strong class="text-text-primary">Legal basis:</strong> Art. 6(1)(b) GDPR (pre-contractual / inquiry-related communication) or (f) – TODO: confirm basis and processing agreements</li>
                <li><strong class="text-text-primary">Retention:</strong> TODO: define how long inquiries/emails are kept</li>
                <li><strong class="text-text-primary">Note:</strong> form data is not stored in the consent cookie or persistently in the browser</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">6. External links</h2>
              <p class="text-text-secondary leading-relaxed">
                This website links to external services (e.g. GitHub, LinkedIn). Clicking those links leaves
                this site; the providers’ own privacy notices apply. No social plugins or marketing pixels
                from those providers are embedded on this website.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">7. Fonts</h2>
              <p class="text-text-secondary leading-relaxed">
                Fonts are not loaded from Google Fonts or other third-party font CDNs. Rendering uses
                locally available / system fonts via the CSS font stack.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">8. Your rights</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                Under applicable law you may have the right to:
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li>Access (Art. 15 GDPR)</li>
                <li>Rectification (Art. 16 GDPR)</li>
                <li>Erasure (Art. 17 GDPR)</li>
                <li>Restriction of processing (Art. 18 GDPR)</li>
                <li>Data portability (Art. 20 GDPR)</li>
                <li>Object (Art. 21 GDPR)</li>
                <li>Withdraw consent (Art. 7(3) GDPR)</li>
                <li>Lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">9. Changes</h2>
              <p class="text-text-secondary leading-relaxed">
                This privacy policy may be updated when features, services or the legal framework change.
                The current version is published on this page.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">10. Contact</h2>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary">
                Chris Leon Noltemeier<br>
                Bad Essen, Germany<br>
                Email: chris.noltemeier@gmail.com
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "en" },
  title: "Privacy Policy – Chris Leon Noltemeier",
  meta: [
    {
      name: "description",
      content:
        "Privacy policy for the portfolio website: hosting, necessary technologies, optional statistics (Vercel Analytics) and contact form.",
    },
  ],
});
</script>
