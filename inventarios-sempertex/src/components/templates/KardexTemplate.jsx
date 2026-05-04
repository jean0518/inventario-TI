import styled from "styled-components";
import { _v, Btnfiltro, Btnsave, Buscador, ContentFiltro, Header, RegistrarKardex, RegistrarMarca, TablaMarca, Tabs, Title, useKardexStore, useMarcaStore } from "../../index";
import { useState } from "react";
export function KardexTemplate({data}){
    const [state, setState] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);
    const [accion, setAccion] = useState("");
    const [openRegistro, setOpenRegistro] = useState(false);
    const [tipo, setTipo] = useState("");
    const nuevaEntrada = () => {
        setOpenRegistro(true)
        setTipo("Entrada")
    }
    const nuevaSalida = () => {
        setOpenRegistro(true)
        setTipo("Salida")
    }
    const {setBuscador} = useKardexStore();
    return (<Container>
        {
            openRegistro && <RegistrarKardex tipo={tipo} dataSelect={dataSelect} accion={accion} onClose={()=>setOpenRegistro(!openRegistro)}/>
        }
        <header className="header1">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state)}}
            />
        </header>
        <section className="area1">
            <ContentFiltro>
                <Title>Kardex</Title>
                    <Btnsave bgcolor="#52de65" titulo="Entrada" funcion={nuevaEntrada}/>
                    <Btnsave bgcolor="#fb6661" titulo="Salida" funcion={nuevaSalida}/>
            </ContentFiltro>
        </section>
        <section className="area2">
            <Buscador setBuscador={setBuscador}/>
        </section>
        <section className="main">
            <Tabs data={data}/>
        </section>
    </Container>)
}
const Container = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: ${({theme}) => theme.bgtotal};
    color: ${({theme}) => theme.text};
    display: grid;
    padding: 15px;
    grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto
    ;
    
    .header{
        grid-area: header1;
        /* background-color: rgba(103, 93, 241, 0.14); */
        display: flex;
        align-items: center;
    }
    .area1{
        grid-area: area1;
        /* background-color: rgba(229, 67, 26, 0.14); */
        display: flex;
        align-items: center;
    }
    .area2{
        grid-area: area2;
        /* background-color: rgba(77, 237, 106, 0.14); */
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .main{
        grid-area: main;
        /* background-color: rgba(179, 46, 241, 0.14); */
        display: flex;
        justify-content: center;
        overflow-y: auto;
        min-height: 0;
    }
`