import { useState } from 'react';
import { Buscador, ListaGenerica, useProductosStore } from '../../index';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

function BuscadorConLista({ onSelectProduct, dataempresa }) {
    const [stateListaProducto, setStateListaProducto] = useState(false);
    const [localBuscador, setLocalBuscador] = useState(''); // ← Estado local para el input
    const { buscarproductos, mostrarproductos } = useProductosStore();

    const { data: allProductos } = useQuery({
        queryKey: ["todos productos", { id_empresa: dataempresa?.id }],
        queryFn: () => mostrarproductos({ id_empresa: dataempresa?.id }),
        enabled: !!dataempresa // ← Se ejecuta siempre que haya empresa
    });

    // ← Query solo en el hijo
    const { data: dataproductosbuscados } = useQuery({
        queryKey: ["buscar productos", { id_empresa: dataempresa?.id, descripcion: localBuscador }],
        queryFn: () => buscarproductos({ id_empresa: dataempresa?.id, descripcion: localBuscador }),
        enabled: !!dataempresa && !!localBuscador
    });

    const handleSelectProduct = (product) => {
        setLocalBuscador(product.descripcion); // ← Actualiza el input local
        setStateListaProducto(false);
        onSelectProduct(product); // ← Notifica al padre
    };

    const listaData = localBuscador ? dataproductosbuscados : allProductos;
    
    return (
        <BuscadorContainer>
            <Buscador 
                funcion={() => setStateListaProducto(!stateListaProducto)} 
                setBuscador={setLocalBuscador} // ← Usa estado local
                onFocus={() => setStateListaProducto(true)} // ← Expande automáticamente al hacer focus
            />
            {stateListaProducto && (
                <ListaGenerica 
                    data={listaData} 
                    setState={() => setStateListaProducto(false)} 
                    funcion={handleSelectProduct} 
                    scroll="scroll" 
                    bottom="auto" 
                />
            )}
        </BuscadorContainer>
    );
}

// ← Estilos (iguales que antes)
const BuscadorContainer = styled.div`
    position: relative;
    padding: 20px;
    z-index: 10;
    margin-bottom: 10px;
    div[class*="Container"] {
        position: absolute;
        top: 100%;
        left: 20px;
        right: 20px;
        margin-top: 5px;
        background: ${({ theme }) => theme.body};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid ${({ theme }) => theme.border || '#e0e0e0'};
        z-index: 100;
        max-height: 300px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #484848;
            border-radius: 10px;
        }
    }
`;

export default BuscadorConLista;