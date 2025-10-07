<template>
  <form @submit.prevent="tambahAnimalCategory" class="form-animal-category">
    <select v-model="animal_id">
      <option disabled value="">Pilih Animal</option>
      <option v-for="animal in animals" :key="animal.id" :value="animal.id">
        {{ animal.name }}
      </option>
    </select>

    <select v-model="category_id">
      <option disabled value="">Pilih Category</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.category_name }}
      </option>
    </select>

    <button type="submit">Tambah Data</button>
  </form>
</template>

<script>
export default {
  props: {
    animals: { type: Array, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      animal_id: "",
      category_id: "",
    };
  },
  methods: {
    async tambahAnimalCategory() {
      if (!this.animal_id || !this.category_id)
        return alert("Animal dan Category wajib dipilih!");

      try {
        const res = await this.$api.$post("/ac", {
          animal_id: this.animal_id,
          category_id: this.category_id,
        });
        this.$emit("tambah", res.data);
        this.animal_id = "";
        this.category_id = "";
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
