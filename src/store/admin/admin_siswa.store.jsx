import { create } from "zustand";
import axiosNew from "../../components/AxiosConfig";

export const useAdminSiswa = create((set, get) => ({
  siswa: [],
  kelas: [],
  addModalTrigger: false,
  onOpenModal: async () => {
    set({ addModalTrigger: true });
  },
  onCloseModal: async () => {
    set({ addModalTrigger: false });
  },
  fetchKelas: async () => {
    set({ kelas: [] });
    await axiosNew
      .get("/kelas", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ kelas: res.data.data });
        }
      });
  },
  fetchSiswa: async () => {
    set({ siswa: [] });
    await axiosNew
      .get("/admin/find-siswa", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ siswa: res.data.data });
        }
      });
  },
  sendCreateSiswa: async (nama, username, password, kelas) => {
    await axiosNew
      .post(
        "/admin/create-siswa",
        {
          nama: nama,
          username: username,
          password: password,
          kelasid: Number(kelas),
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          get().fetchSiswa();
          get().onCloseModal();
        }
      });
  },
}));
