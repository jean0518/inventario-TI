import styled from 'styled-components';
import { _v } from '../../styles/variables';
export function BtnCerrar({funcion}) {
    return (
        <Container onClick={funcion}>
            {<_v.iconocerrar/>}
        </Container>
    )
}
const Container = styled.div`
    cursor: pointer;
    font-size: 25px;
    
    transition: all 0.2s ease;
    &:hover{
        color: ${_v.colorselector};
    }
`;