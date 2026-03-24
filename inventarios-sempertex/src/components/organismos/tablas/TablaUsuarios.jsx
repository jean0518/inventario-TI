import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import styled from "styled-components";
import { _v, ContentAccionesTabla, Paginacion,  useUsuariosStore } from "../../../index";
import Swal from "sweetalert2";
import { FaArrowsAltV } from "react-icons/fa";
import { useState } from "react";

export function TablaUsuarios({data, setOpenRegistro, setDataSelect, setAccion}) {
    const [pagina, setPagina] = useState(1);
    const {eliminarUsuarios} = useUsuariosStore()
    const editar = (data) => {
        if (data.tipouser ==="superadmin") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este registro no se permite modificar ya que es un valor predeterminado"
            });
            return;
        }
        setOpenRegistro(true);
        setDataSelect(data);
        setAccion("Editar");


    };
    const eliminar = (p) => {
        if (p.tipouser==="superadmin") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este registro no se permite eliminar ya que es valor por defecto.",
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
                await eliminarUsuarios({id:p.id})
            }
        })
    };
    const columns = [
        {
            accessorKey: "nombres",
            header:"Nombres",
            cell:(info)=>info.getValue(),
            /* cell:(info)=><span>{info.getValue()}</span> */
        },
        {
            accessorKey: "tipouser",
            header:"Tipo de Usuario",
            cell:(info)=>info.getValue(),
            /* cell:(info)=><span>{info.getValue()}</span> */
        },
        {
            accessorKey: "estado",
            header:"Estado",
            cell:(info)=>info.getValue(),
            /* cell:(info)=><span>{info.getValue()}</span> */
        },
        {
            accessorKey: "acciones",
            header: "",
            enableSorting: false,
            cell:(info)=>(
                    <ContentAccionesTabla 
                        funcionEditar={() => editar(info.row.original)}
                        funcionEliminar={() => eliminar(info.row.original)}
                    />
            )
        }
    ]
    const table = useReactTable({
        data: data || [],
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
                                        {header.column.getCanSort() && (
                                            <span style={{cursor:"pointer"}} onClick={header.column.getToggleSortingHandler()}>
                                                <FaArrowsAltV /> 
                                            </span>
                                        )}
                                        {
                                            {
                                                asc: " ↑",
                                                desc: " ↓",
                                            }[header.column.getIsSorted()]
                                        }
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
            <Paginacion 
                table={table} 
                irinicio={()=>table.setPageIndex(0)}
                pagina={table.getState().pagination.pageIndex+1} 
                setPagina={setPagina}
                maximo={table.getPageCount()}
            />
        </Container>

    );
}
const Container = styled.div`

    width: 90%;
    margin: 2rem auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 320px;
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

    .pagination{
      display:flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .pagination .info{ display:flex; gap:8px; align-items:center; }
    .pagination .controls{ display:flex; gap:8px; align-items:center; }
    .pagination .btn{ display:inline-flex; gap:6px; align-items:center; padding:6px 10px; border-radius:6px; border:1px solid rgba(0,0,0,0.08); background: ${({theme})=>theme.bg}; cursor:pointer; }
    .pagination .btn[disabled]{ opacity: 0.5; cursor: not-allowed; }
    .pagination .page{ font-weight: 600; }

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
        .pagination{ justify-content:center; }
        .pagination .page{ display:none; }
    }
`;