import styled from 'styled-components';
import { useUsuariosStore } from '../../store/UsuariosStore';
import { useEffect, useState } from 'react';
export function ListaModulos({checkboxs, setCheckBoxs, accion}) {
    const {datamodulos, datapermisosEdit} = useUsuariosStore();
    const [isChecked, setIsCheked] = useState(true);
    useEffect(()=> {
        if (accion =="Editar"){
            let allDoc = [];
            datamodulos.map((element)=> {
                const statePermiso = datapermisosEdit?.some((objeto) => objeto.modulos.nombre.includes(element.nombre))
                if(statePermiso){
                  allDoc.push({...element, check: true})
                }else{
                  allDoc.push({...element, check: false})
                }
            })
            setCheckBoxs(allDoc)
        }
        else{
            setCheckBoxs(datamodulos);
        }
    },[datapermisosEdit]);
    const handlecheckbox=(id)=>{
        setCheckBoxs((prev)=>{
            return prev?.map((item)=>{
                if (item.id===id) {
                    return{...item,check:!item.check}
                }
                else{
                    return{...item}
                }
            })
        })
        console.log(checkboxs)
    }
    const seleccionar=(e)=>{
        let check = e.target.checked;
        setIsCheked(check);
        console.log(check)
    }
    return (
        <Container>
        {
            checkboxs?.map((item, index)=>{
                return(
                    <div key={index} onClick={()=>handlecheckbox(item.id)}>
                        <label class="container">
                            <input
                            checked={item.check}
                            type="checkbox" 
                            onChange={(e)=>seleccionar(e)}/>
                            <span>{item.nombre}</span>
                            <div class="checkmark"></div>
                            
                        </label>
                        
                        
                    </div>
                )
            })
        }
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  width: 80%;
  border: 2px dashed #414244;
  border-radius: 15px;
  padding: 20px;

  > div {
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }

  > div:hover {
    background: #f5f5f5;
    color: #1a1a1a;
  }

  /* 🔥 CHECKBOX MÁS PEQUEÑO */
  .container {
    display: inline-block;
    position: relative;
    cursor: pointer;

    /* 👇 reducimos tamaño general */
    font-size: clamp(14px, 1.5vw, 18px);

    user-select: none;
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .container .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.5em;
    width: 1.5em;
    background-color: #fdfcf0;
    border: 3px solid #1a1a1a; /* 👈 un poco más delgado */
    border-radius: 8% 92% 12% 88% / 87% 11% 89% 13%;
    box-shadow: 4px 4px 0px #1a1a1a; /* 👈 proporcional */
    transition:
      transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.2s;
  }

  .container:hover .checkmark {
    transform: scale(1.05) rotate(2deg);
  }

  .container input:checked ~ .checkmark {
    background-color: #ff5722;
    border-radius: 92% 8% 88% 12% / 11% 87% 13% 89%;
    transform: scale(1.1) rotate(-2deg);
  }

  .container .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.36em;
    top: 0.09em;
    width: 0.3em;
    height: 0.7em;
    transform: translate(-50%, -50%) rotate(40deg);
    border: solid #1a1a1a;
    border-width: 0 0.2em 0.2em 0;
    border-radius: 2px;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
    animation: splash 0.3s forwards;
  }

  .container:active .checkmark {
    transform: scale(0.9) translateY(4px);
    box-shadow: 0px 0px 0px #1a1a1a;
  }

  @keyframes splash {
    0% {
      transform: scale(0) rotate(40deg);
      opacity: 0;
    }
    70% {
      transform: scale(1.2) rotate(40deg);
    }
    100% {
      transform: scale(1) rotate(40deg);
      opacity: 1;
    }
  }

  /* 🔥 TEXTO CORREGIDO (YA NO SE MONTA) */
  span {
    display: inline-block;
    margin-left: 35px;
    vertical-align: middle;
    font-size: clamp(0.85rem, 1vw, 1rem);
    line-height: 1.2;
    max-width: 100%;

    /* 🖥️ DESKTOP */
    white-space: nowrap;        /* una sola línea */
    text-overflow: ellipsis;  
    }

  /* 📱 MOBILE */
  @media (max-width: 600px) {
    > div {
      padding: 8px;
    }

    span {
      font-size: 0.85rem;
        /* 🔥 cambia comportamiento */
        white-space: normal;

        display: -webkit-box;
        -webkit-line-clamp: 2;     /* máximo 2 líneas */
        -webkit-box-orient: vertical;

        line-height: 1.3;
        
    }
  }
`;