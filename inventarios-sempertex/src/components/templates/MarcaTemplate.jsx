import styled from "styled-components";
import { _v, Btnfiltro, ContentFiltro, Header, RegistrarMarca, TablaMarca, Title } from "../../index";
import { useState } from "react";
export function MarcaTemplate({data}){
    const [state, setState] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);
    const [accion, setAccion] = useState("");
    const [openRegistro, setOpenRegistro] = useState(false)
    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro);
        setAccion("Nuevo")
        setDataSelect([])
    }
    return (<Container>
        {
            openRegistro && <RegistrarMarca dataSelect={dataSelect} accion={accion} onClose={()=>setOpenRegistro(!openRegistro)}/>
        }
        <header className="header1">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state)}}
            />
        </header>
        <section className="area1">
            <ContentFiltro>
                <Title>Marca</Title>
                    <Btnfiltro
                        funcion={nuevoRegistro}
                        bgcolor="#f6f3f3"
                        textcolor="#353535"
                        icono={<_v.agregar/>}
                    />
            </ContentFiltro>    
        </section>
        <section className="main">
            <TablaMarca data={data}/>
        </section>
    </Container>)
}
const Container = styled.div`
    width: 100%;
    height: 100dvh;
    background-color: ${({theme}) => theme.bgtotal};
    color: ${({theme}) => theme.text};
    display: grid;
    padding: 15px;
    grid-template:
    "header" 100px
    "area1" 100px 
    "main" auto
    ;
    .header{
        grid-area: header1;
        background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .area1{
        grid-area: area1;
        background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        align-items: center;
    }
    .main{
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
        display: flex;
        justify-content: center;
    }
`