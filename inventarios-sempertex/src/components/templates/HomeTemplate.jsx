import styled from "styled-components";
import { Header, Title, BannerEmpresa } from "../../index";
import { useState } from "react";
export function HomeTemplate(){
    const [state, setState] = useState(false);
    return (<Container>
        <header className="headerOne">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state)}}
            />
        </header>
        <section className="area1">
            <Title>Tu empresa</Title>
        </section>
        <section className="main">
            <BannerEmpresa/>
        </section>
    </Container>)
}
const Container = styled.div`
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100dvh;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({theme}) => theme.bgtotal};
    color: ${({theme}) => theme.text};
    display: grid;
    grid-template:
    "header1"
    "area1"
    "main"
    ;
    grid-template-rows: 
        auto
        auto
        1fr
    ;
    align-content: start;
    .headerOne{
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
        justify-content: end;
        margin: 15px;
    }
    .main{
        grid-area: main;
        /* background-color: rgba(179, 46, 241, 0.14); */
        display: flex;
        align-items: center;
    }
    
`