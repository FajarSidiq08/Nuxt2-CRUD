<template>
  <div class="animal-category-page">
    <h1>Daftar Animal & Category</h1>

    <!-- FORM TAMBAH -->
    <AcFormAc
      :api="animalCategoryApi"
      :animals="animalList"
      :categories="categoryList"
      @tambah="tambahAnimalCategory"
    />

    <!-- FORM UPDATE -->
    <AcUpdateAc
      :api="animalCategoryApi"
      :animalCategory="animalCategoryDipilih"
      :visible="showUpdate"
      :animals="animalList"
      :categories="categoryList"
      @update="updateAnimalCategory"
      @batal="showUpdate = false"
    />

    <!-- LIST -->
    <AcListAc
      :api="animalCategoryApi"
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

      animalCategoryApi: null,
    };
  },

  async created() {
    // definisikan API inline
    this.animalCategoryApi = {
      getAll: async () => {
        const res = await this.$api.$get("/ac");
        return res.data;
      },
      create: async (data) => {
        const res = await this.$api.$post("/ac", data);
        return res.data;
      },
      update: async (id, data) => {
        const res = await this.$api.$put(`/ac/${id}`, data);
        return res.data;
      },
      delete: async (id) => {
        const res = await this.$api.$delete(`/ac/${id}`);
        return res.data;
      },
    };

    await this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const [animals, categories, relations] = await Promise.all([
          this.$api.$get("/animal"),
          this.$api.$get("/category"),
          this.animalCategoryApi.getAll(),
        ]);

        this.animalList = animals.data;
        this.categoryList = categories.data;
        this.animalCategoryList = relations;
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    },

    async tambahAnimalCategory(newRelasi) {
      this.animalCategoryApi.create(newRelasi);
      await this.loadData();
    },
    editAnimalCategory(relasi) {
      this.animalCategoryDipilih = relasi;
      this.showUpdate = true;
    },

    async updateAnimalCategory(updated) {
      try {
        await this.animalCategoryApi.update(updated.id, updated);
        this.showUpdate = false;
        await this.loadData();
      } catch (err) {
        console.error("Gagal mengupdate relasi:", err);
      }
    },

    hapusAnimalCategory(relasi) {
      this.animalCategoryList = this.animalCategoryList.filter(
        (r) => r.id !== relasi.id
      );
    },
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
