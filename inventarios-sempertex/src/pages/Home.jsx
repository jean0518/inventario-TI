
import { useQuery } from "@tanstack/react-query";
import { HomeTemplate, useEmpresaStore } from "../index";
export function Home(){
    const {contadorusuariosXempresa, dataempresa} = useEmpresaStore(); 
    const {data} = useQuery(
        {
            queryKey:["contar usuarios por empresa", {idempresa:dataempresa.empresa?.id}], 
            queryFn:()=>contadorusuariosXempresa({id_empresa:dataempresa.empresa?.id}),
            enabled:!!dataempresa
        })
    return (<HomeTemplate/>)
}