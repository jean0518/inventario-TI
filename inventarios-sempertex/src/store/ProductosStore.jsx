import { create } from "zustand";
import { BuscarProductos, EditarProductos, EliminarProductos, InsertarProductos, MostrarProductos } from "../index";
export const useProductosStore = create((set, get)=>({
    buscador: "",
    setBuscador:(p) => {
        set({buscador:p})
    },
    dataproductos: [],
    productosItemSelect: [],
    parametros: {},
    reset: () => {
        set({
            dataproductos: [],
            productosItemSelect: [],
            parametros: {},
            buscador: "",
        });
    },
    mostrarproductos:async (p)=>{
        const response = await MostrarProductos(p);
        if (!response || !Array.isArray(response)) {
        console.warn("⚠️ Respuesta inválida de MostrarProductos");
        set({parametros:p})
        set({dataproductos:[]})
        set({productosItemSelect:{}})
        return [];
        }
        set({parametros:p})
        set({dataproductos:response})
        set({productosItemSelect:response[0] || {}})  // Seguro con || {}
        return response;
    },
    selectproductos:(p)=>{
        set({productosItemSelect:p})
    },
    insertarproductos: async (p)=>{
        await InsertarProductos(p);
        const {mostrarproductos}=get();
        const {parametros} = get();
        set(mostrarproductos(parametros))
    },
    eliminarproductos: async (p) => {
        await EliminarProductos(p);
        const {mostrarproductos} = get();
        const {parametros} = get();
        set(mostrarproductos(parametros));
    },
    editarproductos: async (p) => {
        await EditarProductos(p);
        const {mostrarproductos} = get();
        const {parametros} = get();
        set(mostrarproductos(parametros));
    },
    buscarproductos: async (p) => {
        const response = await BuscarProductos(p);
        set({ dataproductos: response});
        return response;
    }

}))