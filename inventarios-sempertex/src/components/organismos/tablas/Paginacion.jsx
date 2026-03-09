import styled from 'styled-components';
import { _v } from '../../../index';
export function Paginacion({table, pagina, maximo, irinicio}) {
    return (
        <Container>
            <button onClick={() => irinicio()}
                disabled={!table.getCanPreviousPage()}
                >
                <span className='icono'>{<_v.iconotodos/>}</span>
            </button>
            <button disabled={!table.getCanPreviousPage()} 
                onClick={()=>table.previousPage()}>
                <span className='icono izquierda'>{<_v.iconoflechaderecha/>}</span>
            </button>
            <span>{pagina}</span>
            <p> de {maximo}</p>
            <button disabled={!table.getCanNextPage()}
                onClick={()=>table.nextPage()}
            >
                <span className='icono'>{<_v.iconoflechaderecha/>}</span>
            </button>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    button{
        background-color: #FF7800;
        margin-top: 20px;
        margin-bottom: 20px;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
        transition: .3s;
        &:hover{
            box-shadow: 0px 10px 15px -3px #FF7800;
        }
        .icono{
            color: #fff;
            
            &.izquierda{
                transform: rotate(180deg);
            }
        }
    }
    button[disabled]{
        background-color: #646464;
        cursor: no-drop;
        box-shadow: none;
    }
`