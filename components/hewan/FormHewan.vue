<template>
  <form @submit.prevent="tambahHewan" class="form-hewan">
    <input v-model="nama" placeholder="Nama Hewan" />
    <button type="submit">Tambah</button>
  </form>
</template>

<script>
export default {
  props: {
    api: { type: Function, required: true }, // inject service hewan
  },
  data() {
    return { nama: "" };
  },
  methods: {
    async tambahHewan() {
      if (!this.nama) return alert("Nama wajib diisi!");
      try {
        const created = await this.api.create({
          nama: this.nama,
        });
        this.$emit("tambah", created);
        this.nama = "";
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.form-hewan {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.form-hewan input,
.form-hewan select {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.form-hewan input:focus,
.form-hewan select:focus {
  border-color: #4caf50;
  outline: none;
}

.form-hewan button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.form-hewan button:hover {
  background-color: #4caf50;
}
</style>
