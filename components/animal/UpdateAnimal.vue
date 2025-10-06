<template>
  <div v-if="visible" class="update-animal-card">
    <h3>Update Animal</h3>
    <form @submit.prevent="updateAnimal" class="form-update">
      <input v-model="name" placeholder="Nama Animal" />
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
    animal: Object,
    visible: Boolean,
  },
  data() {
    return { name: this.animal?.name || "" };
  },
  watch: {
    animal(newVal) {
      this.name = newVal?.name || "";
    },
  },
  methods: {
    async updateAnimal() {
      if (!this.name) return alert("Nama wajib diisi!");
      try {
        const res = await this.$api.$put(`/animal/${this.animal.id}`, {
          name: this.name,
        });
        this.$emit("update", res.data);
      } catch (err) {
        console.error("Gagal memperbarui animal:", err);
      }
    },
  },
};
</script>

<style>
.update-animal-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.update-animal-card h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.form-update {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form-update input,
.form-update select {
  flex: 1 1 200px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-update input:focus,
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
