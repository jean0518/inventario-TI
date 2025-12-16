import styled from "styled-components";
export function Btnfiltro({ bgcolor, textcolor, icono, funcion}){
    return (<Container $textcolor={textcolor} $bgcolor={bgcolor} onClick={funcion}>
        <div>
            <span>{icono}</span>
        </div>
    </Container>)
}
const Container = styled.div`
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    color: ${(props) => props.$textcolor};
`