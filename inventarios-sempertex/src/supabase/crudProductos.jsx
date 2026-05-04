import { supabase } from "../index";
import Swal from "sweetalert2";

export async function InsertarProductos(p) {
    const {error} = await supabase.rpc("insertarproductos",p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Opps...",
            text: error.message,
            footer: '<a href="">Agregar una nueva descripcion</a>'
        })
    }
}

export async function MostrarProductos(p) {
    const {data, error} = await supabase.rpc("mostrarproductos",p)

    if(error){
        console.error("❌ Error en MostrarProductos:", error);
        return [];
    }

    return data || [];
}

export async function EliminarProductos(p) {
    const {error} = await supabase.from("productos").delete().eq("id", p.id);
    if(error){
        alert("Error al eliminar", error); 
    }
}

export async function EditarProductos(p) {
    const {error} = await supabase.from("productos").update(p).eq("id", p.id);
    if(error){
        alert("Error al editar Productos", error.message);
    }
}

export async function BuscarProductos(p) {
    const {data} = await supabase.rpc("buscarproductos",p)
    return data;
}