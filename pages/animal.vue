<template>
  <div class="animal-page">
    <h1>Daftar Hewan</h1>

    <AnimalFormAnimal :api="animalApi" @tambah="tambahAnimal" />

    <AnimalUpdateAnimal
      :api="animalApi"
      :animal="animalDipilih"
      :visible="showUpdate"
      @update="updateAnimal"
      @batal="showUpdate = false"
    />

    <AnimalListAnimal
      :api="animalApi"
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
      animalApi: null,
    };
  },
  async created() {
    // definisikan API inline (tanpa services/)
    this.animalApi = {
      getAll: async () => {
        const res = await this.$api.$get("/animal");
        return res.data;
      },
      get: async (id) => {
        const res = await this.$api.$get(`/animal/${id}`);
        return res.data;
      },
      create: async (data) => {
        const res = await this.$api.$post("/animal", data);
        return res.data;
      },
      update: async (id, data) => {
        const res = await this.$api.$put(`/animal/${id}`, data);
        return res.data;
      },
      delete: async (id) => {
        const res = await this.$api.$delete(`/animal/${id}`);
        return res.data;
      },
    };

    await this.loadAnimal();
  },
  methods: {
    async loadAnimal() {
      try {
        this.animalList = await this.animalApi.getAll();
      } catch (err) {
        console.error(err);
      }
    },
    tambahAnimal(animal) {
      this.animalList.push(animal);
    },
    editAnimal(animal) {
      this.animalDipilih = animal;
      this.showUpdate = true;
    },
    updateAnimal(updated) {
      const index = this.animalList.findIndex((a) => a.id === updated.id);
      if (index !== -1) this.animalList.splice(index, 1, updated);
      this.showUpdate = false;
    },
    hapusAnimal(animal) {
      this.animalList = this.animalList.filter((a) => a.id !== animal.id);
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
