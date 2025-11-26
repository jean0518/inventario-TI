import styled from "styled-components";
import {LinksArray, SecondarylinksArray, ToggleTema} from "../../index"
import { NavLink } from "react-router-dom";
import {_v} from "../../styles/variables"
import { useState } from "react";
export function MenuHambur() {
    const [click, setClick] = useState(false);
   return(<Container>
        <NavBar>
            <section>
            <HamburgerMenu onClick={() => setClick(!click)}>
                <label className={click?"burger active": "burger"}>
                <span></span>
                <span></span>
  <             span></span>
                </label>
            </HamburgerMenu>
            </section>
                <Menu $click={click.toString()}>
                        {LinksArray.map(({ icon, label, to }) => (
                        <div
                            onClick={() => setClick(false)}
                            className="LinkContainer"
                            key={label}
                        >
                            <NavLink
                            to={to}
                            className="Links"
                            >
                            <div className="Linkicon">{icon}</div>
                            <span>{label}</span>
                            </NavLink>
                        </div>
                        ))}
                        <Divider />
                        {SecondarylinksArray.map(({ icon, label, to }) => (
                        <div
                            onClick={() => setClick(false)}
                            className="LinkContainer"
                            key={label}
                        >
                            <NavLink
                            to={to}
                            className="Links"
                            >
                            <div className="Linkicon">{icon}</div>
                            <span>{label}</span>
                            </NavLink>
                        </div>
                        ))}
                        <ToggleTema/>
                        <Divider />
                </Menu>   
        </NavBar>
    </Container>);
}
const Container = styled.div`
    background-color: ${(props) => props.theme.body};

`
const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
`
const HamburgerMenu = styled.span`
position: fixed ;
top: 2rem;
z-index: 100;
    /* From Uiverse.io by Cevorob */ 
    .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
    transition-duration: 0.5s ease;
    user-select: none;

    span{
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: ${({theme}) => theme.text};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transition: transform 0.25s ease, top 0.25s ease, left 0.25s ease, opacity 0.25s ease, width 0.25s ease;
    }

    /* posiciones iniciales */
    span:nth-of-type(1) {
      top: 0px;
      transform-origin: left center;
    }
    span:nth-of-type(2) {
      top: 50%;
      transform: translateY(-50%);
      transform-origin: left center;
    }
    span:nth-of-type(3) {
      top: 100%;
      transform: translateY(-100%);
      transform-origin: left center;
    }
    /* transformaciones de cada barra en .active */
    &.active span:nth-of-type(1) {
      transform: rotate(45deg);
      top: 0px; /* centra el cruce */
      left: 5px;
    }

    &.active span:nth-of-type(2) {
      width: 0%;
      opacity: 0;
    }

    &.active span:nth-of-type(3) {
      transform: rotate(-45deg);
      top: 28px;
      left: 5px;
    }
}   
`
const Menu = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  z-index: 10;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${(props) => props.$click == "true" ? "translateY(0)" : "translatey(1000%)"};
  transition: all 0.25s ease;

    .LinkContainer{
        &:hover{
            background: ${(props) => props.theme.bgAlpha};
        }
        .Links{
            width: 100vw;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: ${(props) => props.theme.text};
            height: 80px;
        }
        .Linkicon {
            padding: ${_v.smSpacing} ${_v.mdSpacing};
            display: flex;
            svg {
                font-size: 25px
            }
        }
    }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => _v.lgSpacing} 0;
`;
