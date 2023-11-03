import {create} from "zustand"
import axiosNew from "../components/AxiosConfig"


export const useUjian = create((set) => ({
    ujian: [],
    isLoading: false,
    getUjian: async () => {
        set({ isLoading: true })
        await axiosNew.get("/all-ujian", {
           
        }).then((res) => {
            set({ ujian: res.data.data })
            set({ isLoading: false })
        })
    }
}))
