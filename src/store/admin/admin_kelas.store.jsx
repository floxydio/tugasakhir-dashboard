import { create } from "zustand";
import axiosNew from "../../components/AxiosConfig";
import { toast } from "react-toastify";

export const useKelasAdmin = create((set, get) => ({
  kelas: [],
  isLoading: false,

  getDataKelas: async () => {
    set({ isLoading: true });
    await axiosNew
      .get(`/kelas`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ isLoading: false });
          set({ kelas: res.data.data });
        }
      });
  },

  submitKelas: async (guru_id, nomor_kelas, jumlah_orang) => {
    set({ isLoading: true });
    await axiosNew
      .post(
        "/admin/create-kelas",
        {
          guru_id: guru_id,
          nomor_kelas: nomor_kelas,
          jumlah_orang: jumlah_orang,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          window.location.reload();
        }
      });
    // .catch((err) => console.log(err));
  },

  editKelas: async (id) => {
    await axiosNew
      .put(
        `/admin/edit-kelas/${id}`,
        {
          guru_id: guru_id,
          nomor_kelas: nomor_kelas,
          jumlah_orang: jumlah_orang,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something Went Wrong");
      });
  },
}));
