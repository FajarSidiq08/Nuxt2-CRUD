<template>
  <form @submit.prevent="tambahAnimalCategory" class="form-animal-category">
    <select v-model="id_animal">
      <option disabled value="">Pilih Animal</option>
      <option v-for="animal in animals" :key="animal.id" :value="animal.id">
        {{ animal.name }}
      </option>
    </select>

    <select v-model="id_category">
      <option disabled value="">Pilih Category</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.category_name }}
      </option>
    </select>

    <button type="submit">Tambah Relasi</button>
  </form>
</template>

<script>
export default {
  props: {
    api: { type: Object, required: true }, // API inline
    animals: { type: Array, required: true }, // daftar animal dari parent
    categories: { type: Array, required: true }, // daftar category dari parent
  },
  data() {
    return {
      id_animal: "",
      id_category: "",
    };
  },
  methods: {
    async tambahAnimalCategory() {
      if (!this.id_animal || !this.id_category)
        return alert("Animal dan Category wajib dipilih!");

      try {
        const created = await this.api.create({
          id_animal: this.id_animal,
          id_category: this.id_category,
        });
        this.$emit("tambah", created);
        this.id_animal = "";
        this.id_category = "";
      } catch (err) {
        console.error("Gagal menambah relasi animal-category:", err);
        alert("Gagal menambah relasi!");
      }
    },
  },
};
</script>

<style>
.form-animal-category {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.form-animal-category select {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.form-animal-category select:focus {
  border-color: #4caf50;
  outline: none;
}

.form-animal-category button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.form-animal-category button:hover {
  background-color: #43a047;
}
</style>
