<template>
  <div class="category-page">
    <h1>Daftar Kategori</h1>

    <!-- FORM TAMBAH -->
    <CategoryFormCategory :api="$api" @tambah="tambahCategory" />

    <!-- FORM UPDATE -->
    <CategoryUpdateCategory
      :api="$api"
      :category="categoryDipilih"
      :visible="showUpdate"
      @update="updateCategory"
      @batal="showUpdate = false"
    />

    <!-- LIST -->
    <CategoryListCategory
      :api="$api"
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
    };
  },

  methods: {
    async loadCategory() {
      try {
        const res = await this.$api.$get("/category");
        this.categoryList = res.data;
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    },

    async tambahCategory(newCategory) {
      try {
        this.$api.$post("/category", newCategory);
        await this.loadCategory();
      } catch (err) {
        console.error("Gagal menambah kategori:", err);
      }
    },

    editCategory(category) {
      this.categoryDipilih = category;
      this.showUpdate = true;
    },

    async updateCategory(updated) {
      try {
        this.$api.$put(`/category/${updated.id}`, updated);
        this.showUpdate = false;
        await this.loadCategory();
      } catch (err) {
        console.error("Gagal mengupdate kategori:", err);
      }
    },

    async hapusCategory(category) {
      try {
        this.$api.$delete(`/category/${category.id}`);
        this.categoryList = this.categoryList.filter(
          (c) => c.id !== category.id
        );
      } catch (err) {
        console.error("Gagal menghapus kategori:", err);
      }
    },
  },

  mounted() {
    this.loadData();
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
