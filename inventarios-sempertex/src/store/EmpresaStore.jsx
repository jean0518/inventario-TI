import { create } from "zustand";
import { ContarUsuariosXempresa, MostrarEmpresa} from "../index";

export const useEmpresaStore = create((set) => ({
    contadorusuarios: 0,
    dataempresa:[],
    reset: () => {
        set({
            dataempresa: null,
            contadorusuarios: 0,
        });
    },
    mostrarEmpresa: async(p) => {
        const response = await MostrarEmpresa(p);
        set({dataempresa:response.empresa});
        return response.empresa; 
    },
    contadorusuariosXempresa: async (p) => {
        const response = await ContarUsuariosXempresa(p);
    set({ contadorusuarios: response});
    return response
    }
}));