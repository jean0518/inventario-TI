import Swal from "sweetalert2";
import {supabase} from "../index"

export const MostrarEmpresa = async(p) => {
    const {error,data} = await supabase.from("asignarempresa").select(`empresa(id, nombre, simbolomoneda)`).eq("id_usuario",p.idusuario).maybeSingle();
    if (data){
        return data;
    }
};
export const ContarUsuariosXempresa = async (p) => {
    const {data, error} = await supabase.rpc("contar_usuarios_por_empresa",{_id_empresa:p.id_empresa})
    if (error) {
        console.error("Error contando usuarios:", error);
        return 0; // o null si prefieres
    }
    return data ?? 0; // Retorna data o 0 si es null/undefined
}