import styled from "styled-components";
export function CardDatosEmpresa({ titulo , valor, img }) {
    return(
        <Container>
            <div className="card">
                <div className="pricing-block-content">
                    <p className="pricing-plan">{titulo}</p>
                    <div className="price-value">
                        <p className="price-number">{valor}</p>
                        {
                            img && <img src={img}/>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    .card{
        width: clamp(140px, 28vw, 190px);
        max-width: 100%;
        background: #fffefe;
        padding: clamp(0.6rem, 1.4vw, 1rem);
        border-radius: 1rem;
        border: 0.5vmin solid #05060f;
        box-shadow: 0.2rem 0.2rem rgba(5,6,15,0.15);
        overflow: hidden;
        color: black;
        .pricing-block-content{
            display: flex;
            height: 100%;
            flex-direction: column;
            gap: 0.4rem;
            .pricing-plan{
                color: #05060f;
                font-size: clamp(1rem, 2.2vw, 1.3rem);
                line-height: 1.25;
                font-weight: 700;
            }
            .price-value{
                display: flex;
                color: #05060f;
                font-size: clamp(1.2rem, 3vw, 1.8rem);
                line-height: 1.25;
                font-weight: 700;
                justify-content: center;
                img{
                    width: clamp(28px, 8vw, 50px);
                    height: auto;
                }
            }
        }
    }
    @media (max-width: 420px){
      .card{ width: 100%; }
    }
`