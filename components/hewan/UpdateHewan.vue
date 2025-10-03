<template>
  <div v-if="visible" class="update-hewan-card">
    <h3>Update Hewan</h3>
    <form @submit.prevent="updateHewan" class="form-update">
      <input v-model="nama" placeholder="Nama Hewan" />
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
    hewan: Object,
    visible: Boolean,
    api: { type: Function, required: true },
  },
  data() {
    return {
      nama: this.hewan?.nama || "",
    };
  },
  watch: {
    hewan(newVal) {
      this.nama = newVal?.nama || "";
    },
  },
  methods: {
    async updateHewan() {
      try {
        const updated = await this.api.update(this.hewan.id, {
          nama: this.nama,
        });
        this.$emit("update", updated);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.update-hewan-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.update-hewan-card h3 {
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
