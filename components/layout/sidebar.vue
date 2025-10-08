<template>
  <aside class="bg-light border-end" style="width: 250px">
    <ul class="nav flex-column p-3">
      <li class="nav-item mb-2">
        <nuxt-link class="nav-link text-primary-custom fw-semibold" to="/">
          <i class="bi bi-house me-2"></i> Dashboard
        </nuxt-link>
      </li>

      <li class="nav-item mb-2">
        <nuxt-link class="nav-link text-secondary" to="/animal">
          <i class="bi bi-box-seam me-2"></i> Animal
        </nuxt-link>
      </li>

      <li class="nav-item mb-2">
        <nuxt-link class="nav-link text-secondary" to="/category">
          <i class="bi bi-collection me-2"></i> Category
        </nuxt-link>
      </li>

      <li class="nav-item mb-2">
        <nuxt-link class="nav-link text-secondary" to="/ac">
          <i class="bi bi-diagram-3 me-2"></i> AnimalCategory
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  min-height: calc(100vh - 56px);
}
.nav-link {
  transition: color 0.2s ease;
}
.nav-link:hover,
.nav-link.nuxt-link-exact-active {
  color: var(--primary-color) !important;
  font-weight: 600;
}
</style>
