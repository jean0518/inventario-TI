import styled from "styled-components";
import { _v } from "../../styles/variables";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
export function BannerEmpresa() {
    return (
        <Container>
            <div className="content-wrapper-context">
                <span className="titulo">
                    {<_v.iconoempresa/>}
                    Sempertex S.A.S
                </span>
                <div className="context-text">
                    Asegura tus elementos con Sempertex
                </div>
                <ContentCards>
                    <CardDatosEmpresa 
                    titulo="Moneda"
                    valor="$"
                    />
                    <CardDatosEmpresa 
                        titulo="Usuarios"
                        valor="100"
                    />
                </ContentCards>
            </div>
        </Container>
    )
}
const Container = styled.div`
width: 100%;
height: 1005;
position: relative;
display: flex;
align-items: center;
justify-content: center;
border: 0 solid #6b6b6b;
background-size: contain;
background-position: center;
background-repeat: no-repeat, repeat;
border-radius: 14px;
overflow: hidden;
`;
const ContentCards= styled.div`
display: flex;
gap: 10px;
padding-top: 15px;
cursor: pointer;
`;