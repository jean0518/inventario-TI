import styled from "styled-components";
import { _v, Btnfiltro, Buscador, ContentFiltro, Header, RegistrarProductos, TablaProductos, Title, useProductosStore } from "../../index";
import { useState } from "react";
export function ProductosTemplate({ data }) {
    const [state, setState] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);
    const [accion, setAccion] = useState("");
    const [openRegistro, setOpenRegistro] = useState(false)
    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro);
        setAccion("Nuevo")
        setDataSelect([])
    }
    const { setBuscador } = useProductosStore();
    return (<Container>
        {
            openRegistro && <RegistrarProductos dataSelect={dataSelect} accion={accion} onClose={() => setOpenRegistro(!openRegistro)} />
        }
        <header className="header1">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state) }}
            />
        </header>
        <section className="area1">
            <ContentFiltro>
                <Title>Productos</Title>
                <Btnfiltro
                    funcion={nuevoRegistro}
                    bgcolor="#f6f3f3"
                    textcolor="#353535"
                    icono={<_v.agregar />}
                />
            </ContentFiltro>
        </section>
        <section className="area2">
            <Buscador setBuscador={setBuscador} />
        </section>
        <section className="main">
            <TablaProductos data={data}
                setOpenRegistro={setOpenRegistro}
                setDataSelect={setDataSelect}
                setAccion={setAccion}
            />
        </section>
    </Container>)
}
const Container = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
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