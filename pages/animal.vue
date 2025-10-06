<template>
  <div class="animal-page">
    <h1>Daftar Hewan</h1>

    <!-- FORM TAMBAH -->
    <AnimalFormAnimal :api="$api" @tambah="tambahAnimal" />

    <!-- FORM UPDATE -->
    <AnimalUpdateAnimal
      :api="$api"
      :animal="animalDipilih"
      :visible="showUpdate"
      @update="updateAnimal"
      @batal="showUpdate = false"
    />

    <!-- LIST -->
    <AnimalListAnimal
      :api="$api"
      :animalList="animalList"
      @edit="editAnimal"
      @hapus="hapusAnimal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      animalList: [],
      animalDipilih: null,
      showUpdate: false,
    };
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const res = await this.$api.$get("/animal");
        this.animalList = res.data;
      } catch (err) {
        console.error("Gagal memuat data hewan:", err);
      }
    },

    async tambahAnimal(newAnimal) {
      try {
        this.$api.$post("/animal", newAnimal);
        await this.loadData();
      } catch (err) {
        console.error("Gagal menambah hewan:", err);
      }
    },

    editAnimal(animal) {
      this.animalDipilih = animal;
      this.showUpdate = true;
    },

    async updateAnimal(updated) {
      try {
        this.$api.$put(`/animal/${updated.id}`, updated);
        this.showUpdate = false;
        await this.loadData();
      } catch (err) {
        console.error("Gagal mengupdate hewan:", err);
      }
    },

    async hapusAnimal(animal) {
      try {
        this.$api.$delete(`/animal/${animal.id}`);
        this.animalList = this.animalList.filter((a) => a.id !== animal.id);
      } catch (err) {
        console.error("Gagal menghapus hewan:", err);
      }
    },
  },
};
</script>

<style>
.animal-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.animal-page h1 {
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}
</style>
