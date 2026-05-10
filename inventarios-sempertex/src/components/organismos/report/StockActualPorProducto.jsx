import styled from 'styled-components';
import {Document, Page, Text, View, StyleSheet, Font, PDFViewer} from '@react-pdf/renderer'
import { Buscador, ListaGenerica, useEmpresaStore, useProductosStore } from '../../../index';
import { Query, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import BuscadorConLista from '../BuscadorConLista';


function StockActualPorProducto() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const reportstockproductostodos = useProductosStore(state => state.reportstockproductostodos); // ← Remueve buscarproductos y buscador
    const dataempresa = useEmpresaStore(state => state.dataempresa);

    // ← Solo la query para inicializar (si es necesaria)
    const { data } = useQuery({
        queryKey: ["reporte stock todos", { id_empresa: dataempresa?.id }],
        queryFn: () => reportstockproductostodos({ id_empresa: dataempresa?.id }),
        enabled: !!dataempresa
    });

    // ← Callback para recibir el producto seleccionado
    const handleProductSelected = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        position: 'relative',       
    },  
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        width: "100%",
        margin: "auto",
        marginTop: 10
    },
    row: {
        flexDirection: "row",
        borderBottom: 1,
        borderBottomColor: "#121212",
        alignItems: "stretch",
        height: 24,
        borderLeftColor: "#000",
        borderLeft: 1,
        textAlign: "center",
        justifyContent: "flex-start",
        /* alignItems: "center" */
    },
    cell: {
        flex: 1,
        textAlign: "center",
        /* fontFamily: "Inconsolata", */
        borderLeftColor: "#000",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    headerCell: {
        flex: 1,
        backgroundColor: "#dcdcdc",
        fontWeight: "bold",
        /* fontFamily: "Inconsolata", */
        textAlign: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        /* textAlign: "center" */
    }
    });

    const currentDate = new Date();
    const formatDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const renderTablerow = (rowData, isHeader=false) => (
            <View style={styles.row} key={rowData.id}>
                <Text style={[styles.cell, isHeader && styles.headerCell]}>
                    {rowData.descripcion}
                </Text>
                <Text style={[styles.cell, isHeader && styles.headerCell]}>
                    {rowData.stock}
                </Text>
            </View>
    );
    return (
        <Container>
            <BuscadorConLista onSelectProduct={handleProductSelected} dataempresa={dataempresa} />
            <PDFViewerContainer>
                <PDFViewer className='pdfviewer'>
                    <Document title='Reporte de stock por producto'>
                        <Page size="A4" orientation='portrait'>
                            <View style={styles.page}>
                                <View style={styles.section}>
                                    <Text style={{ fontSize: 18, fontWeight: "ultrabold", marginBottom: 10 }}>
                                        Stock actual del producto seleccionado
                                    </Text>
                                    <Text>Fecha y hora del reporte: {formatDate}</Text>
                                    <View>
                                        {renderTablerow({ descripcion: "Producto", stock: "Stock" }, true)}
                                        {selectedProduct ? (
                                            renderTablerow(selectedProduct)
                                        ) : (
                                            <Text style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
                                                Selecciona un producto de la lista para ver su stock actual.
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </PDFViewerContainer>
        </Container>
    )
}
const Container = styled.div`
width: 100%;
height: 90vh;
display: flex;
flex-direction: column;
`;
const BuscadorContainer = styled.div`
position: relative;
padding: 20px;
z-index: 10;
margin-bottom: 10px;

div[class*="Container"] {
        position: absolute;
        top: 100%;  // ← Aparece debajo del buscador
        left: 20px;
        right: 20px;
        margin-top: 5px;
        background: ${({ theme }) => theme.body};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  // ← Sombra
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
const PDFViewerContainer = styled.div`
width: 100%;
flex: 1;
overflow: auto; 
    
    .pdfviewer {
        width: 100%;
        height: 100%;
    }
`;

export default StockActualPorProducto;