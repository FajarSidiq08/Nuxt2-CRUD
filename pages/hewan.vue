<template>
  <div class="hewan-page">
    <h1>Daftar Hewan</h1>

    <HewanFormHewan :api="hewanApi" @tambah="tambahHewan" />

    <HewanUpdateHewan
      :api="hewanApi"
      :hewan="hewanDipilih"
      :visible="showUpdate"
      @update="updateHewan"
      @batal="showUpdate = false"
    />

    <HewanListHewan
      :api="hewanApi"
      :hewanList="hewanList"
      @edit="editHewan"
      @hapus="hapusHewan"
    />
  </div>
</template>

<script>
import hewanService from "@/services/hewan";

export default {
  data() {
    return {
      hewanList: [],
      hewanDipilih: null,
      showUpdate: false,
      hewanApi: null,
    };
  },
  async created() {
    this.hewanApi = hewanService(this.$axios);
    await this.loadHewan();
  },
  methods: {
    async loadHewan() {
      try {
        this.hewanList = await this.hewanApi.getAll();
      } catch (err) {
        console.error(err);
      }
    },
    tambahHewan(hewan) {
      this.hewanList.push(hewan);
    },
    editHewan(hewan) {
      this.hewanDipilih = hewan;
      this.showUpdate = true;
    },
    updateHewan(updated) {
      const index = this.hewanList.findIndex((h) => h.id === updated.id);
      if (index !== -1) this.hewanList.splice(index, 1, updated);
      this.showUpdate = false;
    },
    hapusHewan(hewan) {
      this.hewanList = this.hewanList.filter((h) => h.id !== hewan.id);
    },
  },
};
</script>

<style>
.hewan-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.hewan-page h1 {
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}
</style>
