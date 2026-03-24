import { useEffect, useState } from "react";
import styled from "styled-components";
import { _v } from "../../../styles/variables";
import { Device } from "../../../styles/breakpoints";
import {
  InputText,
  Btnsave,
  convertirMayusculas,
  useProductosStore,
  ContainerSelector,
  Btnfiltro,
  RegistrarMarca,
  ListaGenerica,
  RegistrarCategorias,
  TipoDocData,
  TipouserData,
  ListaModulos,
  useUsuariosStore
} from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { Selector } from "../Selector";
import { useQuery } from "@tanstack/react-query";
export function RegistrarUsuarios({ onClose, dataSelect, accion }) {
  const {isLoading} = useQuery({queryKey:["mostrar permisos Edit", {id_usuario:dataSelect.id}], queryFn:() => mostrarpermisiosEdit({id_usuario:dataSelect.id})});
  const [checkboxs, setCheckBoxs] = useState([]);
  const [tipodoc, setTipoDoc] = useState({icno: "", descripcion: "otros"});
  const [tipouser, setTipouser] = useState({icno: "", descripcion: "empleado"});
  const { insertarUsuarios, editarUsuarios, mostrarpermisiosEdit} = useUsuariosStore();
  const { dataempresa } = useEmpresaStore();
  const [stateTipodoc, setStateTipodoc] = useState(false)
  const [stateTipouser, setStateTipouser] = useState(false)
  const [openRegistroMarca, setOpenRegistroMarca] = useState(false);
  const [openRegistroCategoria, setOpenRegistroCategoria] = useState(false);
  const [subAccion, setSubAccion] = useState("");
  const nuevoRegistroMarca = () => {
    setOpenRegistroMarca(!openRegistroMarca);
    setSubAccion("Nuevo");
  };
  const nuevoRegistroCategoria = () => {
    setOpenRegistroCategoria(!openRegistroCategoria);
    setSubAccion("Nuevo");
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        nombres: data.nombres,
        nro_doc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion,
      };
      await editarUsuarios(p);
      onClose();
    } else {
      const p = {
        nombres: data.nombres,
        correo: data.correo,
        nro_doc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion,
        id_empresa: dataempresa.id
      };
      const parametrosAuth = {
        correo: data.correo,
        pass: data.pass
      }
      await insertarUsuarios(parametrosAuth ,p, checkboxs);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      /* selectMarca({id:dataSelect.id_marca, descripcion:dataSelect.marca})
      selectcategorias({id:dataSelect.id_categoria, descripcion:dataSelect.categoria}) */
    }
  }, []);
  if (isLoading) {
    return <span>Cargando....</span>
  }
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar usuarios"
                : "Registrar nuevo usuario"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">

            <article>
              <InputText icono={<_v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.correo}
                  type="text"
                  placeholder=""
                  {...register("correo", {
                    required: true,
                  })}
                />
                <label className="form__label">Correo</label>
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<_v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.correo}
                  type="text"
                  placeholder=""
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">Pass</label>
                {errors.pass?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<_v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nombres}
                  type="text"
                  placeholder=""
                  {...register("nombres", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombres</label>
                {errors.nombres?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            
            <ContainerSelector>
                <label >Tipo doc: </label>
                <Selector 
                  color="#fc6027"
                  texto1= "📝" 
                  texto2={tipodoc.descripcion}
                  funcion={() => setStateTipodoc(!stateTipodoc)}
                />
                {
                  stateTipodoc && (
                    <ListaGenerica 
                      data={TipoDocData} 
                      bottom="-260px" 
                      scroll="scroll" 
                      setState={() => setStateTipodoc(!stateTipodoc)} 
                      funcion={(p)=>setTipoDoc(p)}/>
                  )
                }
            </ContainerSelector>

            <article>
              <InputText icono={<_v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nro_doc}
                  type="number"
                  placeholder=""
                  {...register("nrodoc", {
                    required: true,
                  })}
                />
                <label className="form__label">Nro. doc</label>
                {errors.nrodoc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            
            <article>
              <InputText icono={<_v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.direccion}
                  type="text"
                  placeholder=""
                  {...register("direccion", {
                    required: true,
                  })}
                />
                <label className="form__label">Direcion</label>
                {errors.direccion?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
          </section>

          <section className="seccion2">
            <ContainerSelector>
              <label>Tipo: </label>
              <Selector 
                color="#fc6027"  
                texto1="👨🏻‍💼"
                texto2={tipouser.descripcion}
                funcion={() => setStateTipouser(!stateTipouser)}
              />
              {
                stateTipouser && (
                  <ListaGenerica
                    data={TipouserData}
                    funcion={(p)=>setTipouser(p)}
                    bottom="-250px"
                    scroll="scroll"
                    setState={() => setStateTipouser(!stateTipouser)}
                  />)
              }
            </ContainerSelector>
            PERMISOS:🗝️
            <ListaModulos 
              accion={accion}
              checkboxs={checkboxs} 
              setCheckBoxs={setCheckBoxs}  
            />


          </section>

          <div className="btnguardarContent">
            <Btnsave
              icono={<_v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#ef552b"
            />
          </div>
        </form>

      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 100%;
    max-width: 90%;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #484848;
      border-radius: 10px;
    }

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet}{
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnguardarContent{
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet}{
          grid-column: 2;
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
