import styled from 'styled-components';
export function BloqueoPagina() {
    return (
        <Container>
            <span className='icono'>🚫</span>
            <span className='texto'>No tienes permisos a este modulo</span>
        </Container>
    )
}
const Container = styled.div`
    position: absolute;
    z-index: 10;
    background: rgba(29, 9, 9, 0.9);
    border: 1px solid rgba(248, 42, 45, 0.5);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    gap: 15px;
    width: 100%;
    height: 100%;
    opacity: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${(props) => props.theme.text};
    .icono{
        font-size: 30px;
    }
`