import styled from "styled-components";
import { Btnsave, useUsariosStore } from "../../index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export function LoginTemplate() {
    const navigate = useNavigate();
    const {insertarUsuarioAdmin} = useUsariosStore();
    const mutationInserUser = useMutation({
        mutationKey:["Insertar usuario admin"],
        mutationFn: async()=>{
            const p ={
                correo: "pruebas1@gmail.com",
                pass: "MAH123456"
            }
            const dt = await insertarUsuarioAdmin(p)
            if (dt){
                navigate("/")
            }
        },
    });
    /* useEffect(() => {
       console.log("useEffect");
    },[mutationInserUser]) */
    return (<Container>
    <Btnsave 
    titulo="Crear cuenta" 
    bgcolor="#fff" 
    funcion={mutationInserUser.mutateAsync}/>
    </Container>)
}
const Container = styled.div`
    height: 100vh;

`