import { create } from "zustand";
import { Buscarproductos, Editarproductos, Eliminarproductos, Insertarproductos, Mostrarproductos } from "../index";
export const useProductosStore = create((set, get)=>({
    buscador: "",
    setBuscador:(p) => {
        set({buscador:p})
    },
    dataproductos: [],
    productosItemSelect: [],
    parametros: {},
    mostrarproductos:async (p)=>{
        const response = await Mostrarproductos(p);
        set({parametros:p})
        set({dataproductos:response})
        set({productosItemSelect:response[0]})
        return response;
    },
    selectproductos:(p)=>{
        set({productosItemSelect:p})
    },
    insertarproductos: async (p)=>{
        await Insertarproductos(p)
        const {mostrarproductos}=get();
        const {parametros} = get();
        set(mostrarproductos(parametros))
    },
    eliminarproductos: async (p) => {
        await Eliminarproductos(p);
        const {mostrarproductos} = get();
        const {parametros} = get();
        set(mostrarproductos(parametros));
    },
    editarproductos: async (p) => {
        await Editarproductos(p);
        const {mostrarproductos} = get();
        const {parametros} = get();
        set(mostrarproductos(parametros));
    },
    buscarproductos: async (p) => {
        const response = await Buscarproductos(p);
        set({ dataproductos: response});
    }

}))