import styled from "styled-components";
import { _v } from "../../styles/variables";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
import { useEmpresaStore } from "../..";
export function BannerEmpresa() {
    const {dataempresa, contadorusuarios} = useEmpresaStore();
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
                        valor={contadorusuarios}
                    />
                </ContentCards>
            </div>
        </Container>
    )
}
const Container = styled.div`
  width: 100%;
  min-height: clamp(180px, 30vh, 380px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 solid #6b6b6b;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 14px;
  overflow: hidden;
  padding: clamp(12px, 2.5vw, 28px);

    .content-wrapper-context{
        width: 100%;
        max-width: 1100px;
        padding: 0;
        gap: 10px;
        display: flex;
        flex-direction: column;
        .titulo{
            font-size: clamp(1.2rem, 2.4vw, 1.875rem);
            font-weight: 700;
            gap: 10px;
            display: flex;
            align-items: center;
            word-break: break-word;
        }
        .content-text{
            font-weight: 400;
            font-size: clamp(0.9rem, 1.6vw, 1rem);
            line-height: 1.6em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;

        }
    }

    @media (max-width: 575px) {
      border-radius: 10px;
      padding: 12px;
    }
`;
const ContentCards= styled.div`
  display: flex;
  gap: 10px;
  padding-top: 15px;
  cursor: pointer;
  flex-wrap: wrap;
  > *{
    flex: 0 1 auto;
  }
  @media (max-width: 420px){
    gap: 8px;
    padding-top: 10px;
  }
`;