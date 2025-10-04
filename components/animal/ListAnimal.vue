<template>
  <ul class="list-animal">
    <li v-for="animal in animalList" :key="animal.id" class="list-item">
      <span class="animal-info">{{ animal.name }}</span>
      <div class="button-group">
        <button class="edit-btn" @click="$emit('edit', animal)">Edit</button>
        <button class="hapus-btn" @click="hapusAnimal(animal)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    animalList: Array,
    api: { type: Object, required: true },
  },
  methods: {
    async hapusAnimal(animal) {
      try {
        await this.api.delete(animal.id);
        this.$emit("hapus", animal);
      } catch (err) {
        console.error("Gagal menghapus animal:", err);
      }
    },
  },
};
</script>

<style>
.list-animal {
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

.animal-info {
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
