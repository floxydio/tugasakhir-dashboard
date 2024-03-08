import { create } from "zustand"
import axiosNew from "../components/AxiosConfig";

export const useToken = create((set) => ({
    token: localStorage.getItem("token"),
}))

export const useRefresh = create((set) => ({
    nama: "",
    check: async () => {
        if (useToken.getState().token === null || useToken.getState().token === undefined) {
            navigate("/sign-in");
            localStorage.removeItem("token");
        } else {
            await axiosNew
                .get("/refresh-token", {
                    headers: {
                        "x-access-token": useToken.getState().token,
                        "ngrok-skip-browser-warning": "any",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        set({ nama: res.data.data.nama });
                    }
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        navigate("/sign-in");
                        localStorage.removeItem("token");
                    }
                });
        }
    }
}))