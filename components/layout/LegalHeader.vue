<template>
  <header class="fixed top-0 left-0 right-0 z-50 site-header is-scrolled">
    <div class="container-page legal-header-inner">
      <nav
        class="legal-header-nav"
        aria-label="Legal page navigation"
      >
        <NuxtLink to="/" class="brand-mark">
          CLN
        </NuxtLink>
        <NuxtLink to="/" class="text-link !min-h-0 text-sm">
          Zur Startseite
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.legal-header-inner {
  min-height: var(--header-height);
  display: flex;
  align-items: center;
}

.legal-header-nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-mark {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #e8eef6;
  text-decoration: none;
  line-height: 1;
  border-radius: 4px;
}

.brand-mark:hover {
  color: #ffffff;
}
</style>
