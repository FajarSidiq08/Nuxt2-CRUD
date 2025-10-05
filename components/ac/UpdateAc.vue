<template>
  <div v-if="visible" class="update-animal-category-card">
    <h3>Update Relasi Animal & Category</h3>

    <form @submit.prevent="updateAnimalCategory" class="form-update">
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

      <div class="button-group">
        <button type="submit" class="update-btn">Update</button>
        <button type="button" @click="$emit('batal')" class="cancel-btn">
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    animalCategory: Object,
    visible: Boolean,
    api: { type: Object, required: true },
    animals: { type: Array, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      id_animal: this.animalCategory?.id_animal || "",
      id_category: this.animalCategory?.id_category || "",
    };
  },
  watch: {
    animalCategory(newVal) {
      this.id_animal = newVal?.id_animal || "";
      this.id_category = newVal?.id_category || "";
    },
  },
  methods: {
    async updateAnimalCategory() {
      if (!this.id_animal || !this.id_category)
        return alert("Animal dan Category wajib dipilih!");

      try {
        const updated = await this.api.update(this.animalCategory.id, {
          id_animal: this.id_animal,
          id_category: this.id_category,
        });
        this.$emit("update", updated);
      } catch (err) {
        console.error("Gagal memperbarui relasi animal-category:", err);
        alert("Gagal memperbarui relasi!");
      }
    },
  },
};
</script>

<style>
.update-animal-category-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.update-animal-category-card h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.form-update {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form-update select {
  flex: 1 1 200px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-update select:focus {
  border-color: #4caf50;
  outline: none;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.update-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.update-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #9e9e9e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #757575;
}
</style>
