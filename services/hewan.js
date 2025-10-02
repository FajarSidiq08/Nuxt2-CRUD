// services/hewan.js
export default ($axios) => ({
  getAll() {
    return $axios.$get("/hewan").then((res) => res.data);
  },
  get(id) {
    return $axios.$get(`/hewan/${id}`).then((res) => res.data);
  },
  create(data) {
    return $axios.$post("/hewan", data).then((res) => res.data);
  },
  update(id, data) {
    return $axios.$put(`/hewan/${id}`, data).then((res) => res.data);
  },
  delete(id) {
    return $axios.$delete(`/hewan/${id}`).then((res) => res.data);
  },
});

