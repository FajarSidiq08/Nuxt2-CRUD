<template>
  <form @submit.prevent="tambahHewan" class="form-hewan">
    <input v-model="nama" placeholder="Nama Hewan" />
    <select v-model="kelompok">
      <option disabled value="">Pilih Kelompok</option>
      <option v-for="k in kelompokOptions" :key="k">{{ k }}</option>
    </select>
    <button type="submit">Tambah</button>
  </form>
</template>

<script>
export default {
  props: {
    kelompokOptions: {
      type: Array,
      default: () => [
        "Mamalia",
        "Burung",
        "Reptil",
        "Amfibi",
        "Ikan",
        "Serangga",
        "Arachnida",
        "Crustacea",
      ],
    },
    api: { type: Function, required: true }, // inject service hewan
  },
  data() {
    return { nama: "", kelompok: "" };
  },
  methods: {
    async tambahHewan() {
      if (!this.nama || !this.kelompok)
        return alert("Nama & kelompok wajib diisi!");
      try {
        const created = await this.api.create({
          nama: this.nama,
          kelompok: this.kelompok,
        });
        this.$emit("tambah", created);
        this.nama = "";
        this.kelompok = "";
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
