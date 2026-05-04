import { supabase } from "../index";
import Swal from "sweetalert2";

export async function InsertarKardex(p) {
    const {error} = await supabase.from("kardex").insert(p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Opps...",
            text: error.message,
            footer: '<a href="">Agregar una nueva descripcion</a>'
        })
    }
}

export async function MostrarKardex(p) {
    const {data} = await supabase.rpc("mostrarkardexxempresa", p).order("id", {ascending: false});
    return data;
}

export async function EliminarKardex(p) {
    const {error} = await supabase.from("Kardex").delete().eq("id", p.id);
    if(error){
        alert("Error al eliminar", error); 
    }
}

export async function EditarKardex(p) {
    const {error} = await supabase.from("Kardex").update(p).eq("id", p.id);
    if(error){
        alert("Error al editar Kardex", error.message);
    }
}

export async function BuscarKardex(p) {
    const {data} = await supabase.rpc("buscarkardexxempresa", p)
    return data;
}