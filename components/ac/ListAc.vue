<template>
  <ul class="list-animal-category">
    <li v-for="item in animalCategoryList" :key="item.id" class="list-item">
      <div class="relation-info">
        <span class="animal-name">{{
          item.animal?.name || "Unknown Animal"
        }}</span>
        <span class="category-name">{{
          item.category?.category_name || "Unknown Category"
        }}</span>
      </div>

      <div class="button-group">
        <button class="edit-btn" @click="$emit('edit', item)">Edit</button>
        <button class="hapus-btn" @click="hapusAnimalCategory(item)">
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    animalCategoryList: { type: Array, required: true },
  },
  methods: {
    async hapusAnimalCategory(item) {
      if (!confirm("Yakin ingin menghapus relasi ini?")) return;
      try {
        await this.$api.$delete(`/ac/${item.id}`);
        this.$emit("hapus", item);
      } catch (err) {
        console.error("Gagal menghapus relasi animal-category:", err);
        alert("Gagal menghapus relasi!");
      }
    },
  },
};
</script>

<style>
.list-animal-category {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f0f0f0;
}

.relation-info {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Membuat dua kolom dengan lebar sama */
  gap: 20px; /* Jarak antar kolom */
  width: 60%; /* Mengatur lebar area informasi */
  font-size: 16px;
  color: #333;
}

.animal-name,
.category-name {
  text-align: left; /* Menyelaraskan teks ke kiri untuk konsistensi */
}

.button-group {
  display: flex;
  gap: 10px;
}

.button-group button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #2196f3;
  color: #ffffff;
}

.edit-btn:hover {
  background-color: #1e88e5;
}

.hapus-btn {
  background-color: #f44336;
  color: white;
}

.hapus-btn:hover {
  background-color: #d32f2f;
}
</style>
