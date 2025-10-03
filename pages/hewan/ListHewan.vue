<template>
  <ul class="list-hewan">
    <li v-for="hewan in hewanList" :key="hewan.id" class="list-item">
      <span class="hewan-info">{{ hewan.nama }} - {{ hewan.kelompok }}</span>
      <div class="button-group">
        <button class="edit-btn" @click="$emit('edit', hewan)">Edit</button>
        <button class="hapus-btn" @click="hapusHewan(hewan)">Hapus</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    hewanList: Array,
    api: { type: Function, required: true },
  },
  methods: {
    async hapusHewan(hewan) {
      try {
        await this.api.delete(hewan.id);
        this.$emit("hapus", hewan);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.list-hewan {
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

.hewan-info {
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
  background-color: #2196f3;
}

.hapus-btn {
  background-color: #f44336;
  color: white;
}

.hapus-btn:hover {
  background-color: #d32f2f;
}
</style>
