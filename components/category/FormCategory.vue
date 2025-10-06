<template>
  <form @submit.prevent="tambahCategory" class="form-category">
    <input v-model="category_name" placeholder="Nama Kategori" />
    <button type="submit">Tambah</button>
  </form>
</template>

<script>
export default {
  props: {
    api: { type: Object, required: true }, // menerima $api dari parent
  },
  data() {
    return { category_name: "" };
  },
  methods: {
    async tambahCategory() {
      if (!this.category_name) return alert("Nama kategori wajib diisi!");
      try {
        const created = await this.api.$post("/category", {
          category_name: this.category_name,
        });
        this.$emit("tambah", created);
        this.category_name = "";
      } catch (err) {
        console.error("Gagal menambah kategori:", err);
      }
    },
  },
};
</script>

<style>
.form-category {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.form-category input,
.form-category select {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.form-category input:focus,
.form-category select:focus {
  border-color: #4caf50;
  outline: none;
}

.form-category button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.form-category button:hover {
  background-color: #43a047;
}
</style>
