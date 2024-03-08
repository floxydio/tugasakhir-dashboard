import { create } from "zustand";
import axiosNew from "../../components/AxiosConfig";

export const useAdminGuru = create((set, get) => ({
  guru: [],
  isLoading: false,
  getGuru: async () => {
    set({ isLoading: true });
    await axiosNew
      .get("/admin/find-guru", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ guru: res.data.data });
          set({ isLoading: false });
        }
      });
  },
  createGuru: async (guru_id, nama, username, status_guru) => {
    const userAgent = window.navigator.userAgent;
    await axiosNew
      .post(
        "/admin/create-guru",
        {
          guru_id: guru_id,
          nama: nama,
          username: username,
          status_guru: status_guru,
          user_agent: userAgent,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          getGuru();
        }
      });
  },
}));
