
import { useQuery } from "@tanstack/react-query";
import { HomeTemplate, useEmpresaStore } from "../index";
export function Home(){
    const {contadorusuariosXempresa, dataempresa} = useEmpresaStore(); 
    const {data} = useQuery(
        {
            queryKey:["contar usuarios por empresa", {idempresa:dataempresa?.id}], 
            queryFn:()=>contadorusuariosXempresa({id_empresa:dataempresa?.id}),
            enabled: dataempresa !== null && dataempresa?.id != null
        })
    return (<HomeTemplate/>)
}