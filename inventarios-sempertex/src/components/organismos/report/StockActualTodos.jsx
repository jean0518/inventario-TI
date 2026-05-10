import styled from 'styled-components';
import {Document, Page, Text, View, StyleSheet, Font, PDFViewer} from '@react-pdf/renderer'
import { useEmpresaStore, useProductosStore } from '../../../index';
import { Query, useQuery } from '@tanstack/react-query';


function StockActualTodos() {
    const {reportstockproductostodos} = useProductosStore();
    const {dataempresa} = useEmpresaStore();
    const {data, isLoading, error} = useQuery({
        queryKey: ["reporte stock todos", {id_empresa:dataempresa?.id}],
        queryFn: () => reportstockproductostodos({id_empresa:dataempresa?.id}),enabled:!!dataempresa
    });
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
            <PDFViewer className='pdfviewer'>
                <Document title='Reporte de stock todos'>
                    <Page size="A4" orientation='portrait'>
                            <View style={styles.page}>
                                <View style={styles.section}>
                                    <Text style={{fontSize: 18, fontWeight: "ultrabold", marginBottom:10}}>Stock actual todos</Text>
                                    <Text> Fecha y hora del reporte: {formatDate}</Text>
                                    <View>
                                        {
                                            renderTablerow(
                                                {
                                                    descripcion: "Producto",
                                                    stock: "Stock"
                                                },
                                                true
                                            )
                                        }
                                        {
                                            data?.map((item) => renderTablerow(item))
                                        }
                                        
                                    </View>
                                </View>
                            </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Container>
    )
}
const Container = styled.div`
width: 100%;
height: 90vh;
    .pdfviewer{
        width: 100%;
        height: 100%;
    }
`

export default StockActualTodos;