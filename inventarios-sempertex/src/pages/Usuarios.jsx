import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader, useEmpresaStore, useUsuariosStore, UsuariosTemplate } from "../index";

export function Usuarios(){
    const {mostrarUsuariosTodos, dataUsuarios, buscarUsuarios, buscador, mostrarModulos} = useUsuariosStore();
    const {dataempresa} = useEmpresaStore();
    const {isLoading,error} = useQuery({
        queryKey:["mostrar usuarios", {_id_empresa:dataempresa?.id}],
        queryFn:()=>mostrarUsuariosTodos({_id_empresa:dataempresa?.id}),
        enabled:dataempresa?.id!=null,
    });

    const {data:buscardata} = useQuery({
        queryKey:["buscar usuarios", {id_empresa:dataempresa.id,descripcion:buscador}],
        queryFn:()=>buscarUsuarios({id_empresa:dataempresa.id,descripcion:buscador}),
        enabled:dataempresa.id!=null && buscador.trim() !== ""
    });

    const {data:datamodulos} = useQuery({
        queryKey:["mostrar modulos"],
        queryFn:mostrarModulos,
    });
    if (isLoading){
        return <SpinnerLoader/>
    }
    if(error){
        return <span>Error...</span>;
    }
    const dataMostrar = buscador.trim() !== "" ? dataUsuarios : dataUsuarios;
    return (<UsuariosTemplate data={dataMostrar}/>);
}