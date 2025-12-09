import styled from "styled-components";
import { _v } from "../../styles/variables";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
import { useEmpresaStore } from "../..";
export function BannerEmpresa() {
    const {dataempresa} = useEmpresaStore();
    return (
        <Container>
            <div className="content-wrapper-context">
                <span className="titulo">
                    {<_v.iconoempresa/>}
                    {dataempresa.empresa?.nombre}
                </span>
                <div className="context-text">
                    Asegura tus elementos con Sempertex
                </div>
                <ContentCards>
                    <CardDatosEmpresa 
                    titulo="Moneda"
                    valor={dataempresa.empresa?.simbolomoneda}
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
display: flex;
align-items: center;
justify-content: center;
border: 0 solid #6b6b6b;
background-size: contain;
background-position: center;
background-repeat: no-repeat, repeat;
border-radius: 14px;
overflow: hidden;

    .content-wrapper-context{
        padding: 20px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        .titulo{
            font-size: 30px;
            font-weight: 700;
            gap: 10px;
            display: flex;
            align-items: center;
        }
        .content-text{
            font-weight: 400;
            font-size: 14px;
            line-height: 1.7em;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;

        }
    }
`;
const ContentCards= styled.div`
display: flex;
gap: 10px;
padding-top: 15px;
cursor: pointer;
`;