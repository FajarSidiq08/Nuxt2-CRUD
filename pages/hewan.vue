<template>
  <div>
    <h1>Daftar Hewan</h1>

    <!-- Form tambah hewan -->
    <form @submit.prevent="tambahHewan" class="flex flex-col gap-2 mb-4">
      <input
        v-model="newHewan.nama"
        placeholder="Nama"
        class="border p-2 rounded"
      />
      <select v-model="newHewan.kelompok" class="border p-2 rounded">
        <option disabled value="">Pilih Kelompok</option>
        <option v-for="k in kelompokOptions" :key="k" :value="k">
          {{ k }}
        </option>
      </select>
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Tambah
      </button>
    </form>

    <!-- List hewan -->
    <ul>
      <li v-for="h in hewans" :key="h.id" class="mb-2">
        {{ h.nama }} - {{ h.kelompok }}
        <button @click="startEdit(h)" class="ml-2 text-yellow-600">Edit</button>
        <button @click="hapusHewan(h.id)" class="ml-2 text-red-600">
          Hapus
        </button>
      </li>
    </ul>

    <!-- Form Edit -->
    <div v-if="editingHewan" class="mt-4 border p-4 rounded bg-gray-50">
      <h2 class="font-bold mb-2">Edit Hewan</h2>
      <input
        v-model="editingHewan.nama"
        placeholder="Nama"
        class="border p-2 rounded mb-2 w-full"
      />
      <select
        v-model="editingHewan.kelompok"
        class="border p-2 rounded mb-2 w-full"
      >
        <option disabled value="">Pilih Kelompok</option>
        <option v-for="k in kelompokOptions" :key="k" :value="k">
          {{ k }}
        </option>
      </select>
      <div class="flex gap-2">
        <button
          @click="updateHewan"
          class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Simpan
        </button>
        <button
          @click="cancelEdit"
          class="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HewanService from "~/services/hewan";

export default {
  data: () => ({
    hewans: [],
    newHewan: { nama: "", kelompok: "" },
    editingHewan: null, // Menampung hewan yang sedang diedit
    kelompokOptions: [
      "Mamalia",
      "Burung",
      "Reptil",
      "Amfibi",
      "Ikan",
      "Serangga",
      "Arachnida",
      "Crustacea",
    ],
  }),

  async mounted() {
    await this.loadHewan();
  },

  methods: {
    loadHewan: async function () {
      this.hewans = await HewanService(this.$axios).getAll();
    },

    tambahHewan: async function () {
      if (!this.newHewan.kelompok) return alert("Pilih kelompok hewan!");
      try {
        const created = await HewanService(this.$axios).create(this.newHewan);
        this.hewans.push(created);
        this.newHewan = { nama: "", kelompok: "" };
        alert("Hewan berhasil ditambah!");
      } catch (error) {
        console.error(error);
        alert(
          "Gagal menambah hewan: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    startEdit: function (h) {
      // Buat salinan agar v-model tidak langsung mengubah list
      this.editingHewan = { ...h };
    },

    cancelEdit: function () {
      this.editingHewan = null;
    },

    updateHewan: async function () {
      if (!this.editingHewan.kelompok) return alert("Pilih kelompok hewan!");
      try {
        await HewanService(this.$axios).update(
          this.editingHewan.id,
          this.editingHewan
        );
        this.loadHewan();
        this.editingHewan = null;
        alert("Hewan berhasil diupdate!");
      } catch (error) {
        console.error(error);
        alert(
          "Gagal update hewan: " +
            (error.response?.data?.message || error.message)
        );
      }
    },

    hapusHewan: async function (id) {
      if (confirm("Yakin hapus?")) {
        await HewanService(this.$axios).delete(id);
        this.loadHewan();
      }
    },
  },
};
</script>
