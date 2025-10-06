<template>
  <ul class="list-category">
    <li v-for="category in categoryList" :key="category.id" class="list-item">
      <span class="category-info">{{ category.category_name }}</span>
      <div class="button-group">
        <button class="edit-btn" @click="$emit('edit', category)">Edit</button>
        <button class="hapus-btn" @click="hapusCategory(category)">
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categoryList: Array,
    api: { type: Object, required: true },
  },
  methods: {
    async hapusCategory(category) {
      try {
        await this.api.$delete(`/category/${category.id}`);
        this.$emit("hapus", category);
      } catch (err) {
        console.error("Gagal menghapus kategori:", err);
      }
    },
  },
};
</script>

<style>
.list-category {
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

.category-info {
  font-size: 16px;
  color: #333;
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
