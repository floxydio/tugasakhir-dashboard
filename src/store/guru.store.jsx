import {create} from "zustand"
import axiosNew from "../components/AxiosConfig"

export const useGuru = create((set) => ({
    guru: [],
    isLoading: false,
    getDataGuru: async () => {
        set({ isLoading: true })
        await axiosNew.get("/guru", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((res) => {
            set({ guru: res.data.data })
            set({ isLoading: false })
        })
    }
}))