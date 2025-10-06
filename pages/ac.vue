<template>
  <div class="animal-category-page">
    <h1>Daftar Animal & Category</h1>

    <!-- FORM TAMBAH -->
    <AcFormAc
      :animals="animalList"
      :categories="categoryList"
      @tambah="tambahAnimalCategory"
    />

    <!-- FORM UPDATE -->
    <AcUpdateAc
      :animalCategory="animalCategoryDipilih"
      :visible="showUpdate"
      :animals="animalList"
      :categories="categoryList"
      @update="updateAnimalCategory"
      @batal="showUpdate = false"
    />

    <!-- LIST -->
    <AcListAc
      :animalCategoryList="animalCategoryList"
      @edit="editAnimalCategory"
      @hapus="hapusAnimalCategory"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      animalList: [],
      categoryList: [],
      animalCategoryList: [],
      animalCategoryDipilih: null,
      showUpdate: false,
    };
  },

  methods: {
    async loadData() {
      try {
        const [animalsRes, categoriesRes, relationsRes] = await Promise.all([
          this.$api.$get("/animal"),
          this.$api.$get("/category"),
          this.$api.$get("/ac"),
        ]);

        this.animalList = animalsRes.data;
        this.categoryList = categoriesRes.data;
        this.animalCategoryList = relationsRes.data;
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    },

    async tambahAnimalCategory(newRelasi) {
      try {
        this.$api.$post("/ac", newRelasi);
        await this.loadData();
      } catch (err) {
        console.error("Gagal menambah relasi:", err);
      }
    },

    editAnimalCategory(relasi) {
      this.animalCategoryDipilih = relasi;
      this.showUpdate = true;
    },

    async updateAnimalCategory(updated) {
      try {
        this.$api.$put(`/ac/${updated.id}`, updated);
        this.showUpdate = false;
        await this.loadData();
      } catch (err) {
        console.error("Gagal mengupdate relasi:", err);
      }
    },

    async hapusAnimalCategory(relasi) {
      try {
        this.$api.$delete(`/ac/${relasi.id}`);
        this.animalCategoryList = this.animalCategoryList.filter(
          (r) => r.id !== relasi.id
        );
      } catch (err) {
        console.error("Gagal menghapus relasi:", err);
      }
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style>
.animal-category-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.animal-category-page h1 {
  font-size: 26px;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}
</style>
