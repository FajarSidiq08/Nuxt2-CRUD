<template>
  <form @submit.prevent="tambahAnimal" class="form-animal">
    <input v-model="name" placeholder="Nama Animal" />
    <button type="submit">Tambah</button>
  </form>
</template>

<script>
export default {
  props: {
    api: { type: Object, required: true }, // menerima api inline dari parent
  },
  data() {
    return { name: "" };
  },
  methods: {
    async tambahAnimal() {
      if (!this.name) return alert("Nama wajib diisi!");
      try {
        const created = await this.api.create({
          name: this.name,
        });
        this.$emit("tambah", created);
        this.name = "";
      } catch (err) {
        console.error("Gagal menambah animal:", err);
      }
    },
  },
};
</script>

<style>
.form-animal {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.form-animal input,
.form-animal select {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.form-animal input:focus,
.form-animal select:focus {
  border-color: #4caf50;
  outline: none;
}

.form-animal button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.form-animal button:hover {
  background-color: #43a047;
}
</style>
