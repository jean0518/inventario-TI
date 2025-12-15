import styled from "styled-components";
import { AccionTabla, _v } from "../../index";
export function ContentAccionesTabla({funcionEditar,funcionEliminar}){
    return(
        <Container>
            <AccionTabla 
            funcion={funcionEditar} 
            fontSize="18px" 
            color="#7d7d7d" 
            icono={<_v.iconeditarTabla/>}
            />
            <AccionTabla 
            funcion={funcionEliminar} 
            fontSize="18px" 
            color="#7d7d7d" 
            icono={<_v.iconeliminarTabla/>}
            />

        </Container>);
}
const Container = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;
    justify-content: center;
    @media (max-width: 48em) {
        justify-content: end;
    }
`