import { supabase } from "../index";
import Swal from "sweetalert2";

export async function InsertarCategorias(p) {
    const {error} = await supabase.rpc("insertarcategorias",p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Opps...",
            text: error.message,
            footer: '<a href="">Agregar una nueva descripcion</a>'
        })
    }
}

export async function MostrarCategorias(p) {
    const {data} = await supabase.from("categorias").select().eq("id_empresa", p.id_empresa).order("id", {ascending: true});
    return data;
}

export async function EliminarCategorias(p) {
    const {error} = await supabase.from("categorias").delete().eq("id", p.id);
    if(error){
        alert("Error al eliminar", error); 
    }
}

export async function EditarCategorias(p) {
    const {error} = await supabase.from("categorias").update(p).eq("id", p.id);
    if(error){
        alert("Error al editar Categorias", error.message);
    }
}

export async function BuscarCategorias(p) {
    const {data} = await supabase.from("categorias").select().eq("id_empresa", p.id_empresa).ilike("descripcion", "%"+p.descripcion+"%")
    return data;
}