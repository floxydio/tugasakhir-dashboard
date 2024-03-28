import { create } from "zustand";
import axiosNew from "../../components/AxiosConfig";
import { toast } from "react-toastify";

export const useAdminGuru = create((set, get) => ({

  guru: [],
  totalPageGuru: 0,
  isLoading: false,
  addModalTrigger: false,
  editModalTrigger: false,
  deleteModalTrigger: false,
  showPasswordTrigger: false,
  dataPasswordTrigger: null,

  onOpenAddModal: async () => {
    set({ addModalTrigger: true });
  },
  onCloseAddModal: async () => {
    set({ addModalTrigger: false });
  },

  onOpenEditModal: async () => {
    set({ editModalTrigger: true });
  },
  onCloseEditModal: async () => {
    set({ editModalTrigger: false });
  },

  onShowPassword: async () => {
    set({ showPasswordTrigger: true });
  },
  onHidePassword: async () => {
    set({ showPasswordTrigger: false });
  },

  onOpenDeleteModal: async () => {
    set({ deleteModalTrigger: true });
  },
  onCloseDeleteModal: async () => {
    set({ deleteModalTrigger: false });
  },

  getGuru: async (page) => {
    set({ guru: [] });
    await axiosNew
      .get(`/admin/find-guru?page=${page}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ isLoading: false });
          set({ totalPageGuru: res.data.total_page })
          set({ guru: res.data.data });
        }
      });
  },

  createGuru: async (nama, username, password, user_agent) => {
    await axiosNew
      .post(
        "/admin/create-guru",
        {
          nama: nama,
          username: username,
          password: password,
          user_agent: user_agent,
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

  updateGuru: async (id, nama, username, status_user) => {
    await axiosNew
      .put(
        `/admin/edit-guru/${id}`,
        {
          nama: nama,
          username: username,
          status_user: status_user,
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

  deleteGuru: async (id) => {
    await axiosNew
      .delete(`/admin/delete-guru/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something Went Wrong");
      });
  },

}));
