<template>
  <div class="d-flex flex-column min-vh-100">
    <LayoutNavbar />
    <div class="d-flex flex-grow-1">
      <LayoutSidebar />
      <main class="flex-grow-1 p-4">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
