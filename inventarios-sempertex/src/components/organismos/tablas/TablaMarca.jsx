import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import styled from "styled-components";
import { _v, ContentAccionesTabla, useMarcaStore } from "../../../index";
import Swal from "sweetalert2";

export function TablaMarca({data}) {
    const {eliminarMarca} = useMarcaStore()
    const editar = () => {

    };
    const eliminar = (p) => {
        if (p.descripcion==="Generica") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este registro no se permite modificar ya que es valor por defecto.",
            });
            return;
        }
        Swal.fire({
            title: "¿Estas seguro de eliminar este registro?",
            text: "Una vez aliminado el registro, no se puede recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                await eliminarMarca({id:p.id})
            }
        })
    };
    const columns = [
        {
            accessorKey: "descripcion",
            header:"Descripcion",
            cell:(info)=>info.getValue(),
            /* cell:(info)=><span>{info.getValue()}</span> */
        },
        {
            accessorKey: "acciones",
            header: "Acciones",
            cell:(info)=>(
                    <ContentAccionesTabla 
                        funcionEditar={() => editar(info.row.original)}
                        funcionEliminar={() => eliminar(info.row.original)}
                    />
            )
        }
    ]
    const table = useReactTable({
        data,
        columns,    
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <Container>
            <table className="responsive-table">
                <thead>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup}>
                                {headerGroup.headers.map((header)=>(
                                    <th key={header.id}>
                                        {header.column.columnDef.header}
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((item)=>(
                        <tr key={item.id}>
                            {
                                item.getVisibleCells().map((cell)=>(
                                    <td 
                                        key={cell.id}
                                        data-label={cell.column.columnDef.header}
                                    >                              
                                        {
                                        flexRender(cell.column.columnDef.cell,
                                        cell.getContext()
                                        )}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>

    );
}
const Container = styled.div`

    width: 90%;
    margin: 2rem auto;

    table{
        width: 100%;
        border-collapse: collapse;
    }

    thead{
        background: ${({ theme }) => theme.bgSecondary};
    }
    th,
    td{
        padding: 0.75rem;
        border-bottom: 1px solid rgba(150, 150, 150, 0.3);
        text-align: center;
    }
    th{
        font-weight: 600;
        color: ${({theme}) => theme.text};
    }

    @media (max-width: 768px) {
        table,
        thead,
        tbody,
        tr{
            display: block;
            width: 100%;
        }

        thead{
            display: none;
        }

        tr{
            background: ${({theme}) => theme.bgCard};
            margin-bottom: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            padding: 0.5rem 0;    
        }
        td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.6rem 1rem;
            text-align: right;
            border: none;
        }
        td::before {
            content: attr(data-label);
            font-weight: 600;
            color: ${({ theme }) => theme.text};
            text-align: left;
        }
    };

  /* position: relative;
  margin: 5% 3%;
  @media (min-width: ${_v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${_v.bphomer}) {
    margin: 2em auto;
   
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${_v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${_v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${_v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${_v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${_v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${_v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${_v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${_v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${_v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${_v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${_v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${_v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${_v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${_v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${_v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${_v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${_v.bpbart}) {
          content: none;
        }
      }
    }
  } */
`;