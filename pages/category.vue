<template>
  <div class="category-page">
    <h1>Daftar Kategori</h1>
    <CategoryFormCategory :api="categoryApi" @tambah="tambahCategory" />
    <CategoryUpdateCategory
      :api="categoryApi"
      :category="categoryDipilih"
      :visible="showUpdate"
      @update="updateCategory"
      @batal="showUpdate = false"
    />
    <CategoryListCategory
      :api="categoryApi"
      :categoryList="categoryList"
      @edit="editCategory"
      @hapus="hapusCategory"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      categoryDipilih: null,
      showUpdate: false,
      categoryApi: null,
    };
  },

  async created() {
    // API inline — tidak pakai services/
    this.categoryApi = {
      getAll: async () => {
        const res = await this.$api.$get("/category");
        return res.data;
      },
      get: async (id) => {
        const res = await this.$api.$get(`/category/${id}`);
        return res.data;
      },
      create: async (data) => {
        const res = await this.$api.$post("/category", data);
        return res.data;
      },
      update: async (id, data) => {
        const res = await this.$api.$put(`/category/${id}`, data);
        return res.data;
      },
      delete: async (id) => {
        const res = await this.$api.$delete(`/category/${id}`);
        return res.data;
      },
    };

    await this.loadCategory();
  },

  methods: {
    async loadCategory() {
      try {
        this.categoryList = await this.categoryApi.getAll();
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    },

    tambahCategory(category) {
      this.categoryList.push(category);
    },

    editCategory(category) {
      this.categoryDipilih = category;
      this.showUpdate = true;
    },

    updateCategory(updated) {
      const index = this.categoryList.findIndex((c) => c.id === updated.id);
      if (index !== -1) this.categoryList.splice(index, 1, updated);
      this.showUpdate = false;
    },

    hapusCategory(category) {
      this.categoryList = this.categoryList.filter((c) => c.id !== category.id);
    },
  },
};
</script>

<style>
.category-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.category-page h1 {
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}
</style>
