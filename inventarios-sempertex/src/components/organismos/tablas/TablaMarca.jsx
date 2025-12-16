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
`;