// services/pdfCertificadoAvaluoCatastral.js

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = async (certificado: Certificado) => {
  try {
    const imgHeader = await loadImageAsBase64("/imgheader.png");
    const imgFooter = await loadImageAsBase64("/imgfooter.png");
    const imgBg = await loadImageAsBase64("/imgbg.png");
    const logo = await loadImageAsBase64("/logo.png");

    const docDefinition: TDocumentDefinitions = {
      footer: (currentPage, pageCount) => ({
        stack: [
          {
            image: imgFooter,
            width: 400,
            absolutePosition: { x: 500, y: 750 },
          },
          {
            text: `Página ${currentPage} de ${pageCount}`,
            alignment: "right",
            margin: [0, 0, 30, 0],
          },
        ],
      }),
      background: function (currentPage, pageSize) {
        return {
          image: imgBg,
          width: pageSize.width,
          height: pageSize.height,
          absolutePosition: { x: 0, y: 0 },
          opacity: 1, // Ajusta la opacidad si es necesario
        };
      },
      content: [
        {
          columns: [
            {
              columns: [
                { image: logo, width: 80 },
                {
                  stack: [
                    { text: "Sictax", bold: true, fontSize: 10 },
                    { text: "Gestión Catastral", fontSize: 8 },
                  ],
                  margin: [0, 30, 0, 0],
                },
              ],
              margin: [0, 10, 0, 0],
            },
            {
              width: "50%",
              alignment: "right",
              stack: [
                { qr: "text in QR", fit: 80 },
                {
                  text: "Sello de radicacion",
                  fontSize: 8,
                  margin: [0, 5, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 0],
        },
        {
          text: "CERTIFICADO AVALÚO CATASTRAL",
          alignment: "center",
          bold: true,
          marginBottom: 20,
        },
        {
          text: `El area metropolitana de ${certificado.municipio}, certifica que el predio con código predial nacional catastral ${certificado.predial} presenta un avalúo catastral de ${certificado.avaluo} con vigencia para el año 2024, se encuentra inscrito en la base de datos con la siguiente información:`,
          marginBottom: 20,
        },
        {
          text: "PREDIO NUMERO 1",
          marginBottom: 20,
        },
        // Tabla
        {
          table: {
            body: [
              // Fila de cabecera con título
              [
                {
                  text: "INFORMACIÓN FÍSICA",
                  colSpan: 4,
                  alignment: "center",
                  fillColor: "#D3D3D3",
                  bold: true,
                },
                {},
                {},
                {},
              ],
              // Fila con dos columnas
              [
                {
                  text: "Número Predial Nacional",
                  colSpan: 2,
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {},
                {
                  text: "Matrícula Inmobiliaria",
                  colSpan: 2,
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {},
              ],
              [
                {
                  text: "082960101000000180029000000000",
                  colSpan: 2,
                  alignment: "center",
                },
                {},
                { text: "040-137574", colSpan: 2, alignment: "center" },
                {},
              ],
              // Fila con tres columnas
              [
                {
                  text: "Departamento",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {
                  text: "Municipio",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {
                  text: "Dirección",
                  colSpan: 2,
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {},
              ],
              [
                { text: "08-ATLÁNTICO", alignment: "center" },
                { text: "296-GALAPA", alignment: "center" },
                {
                  text: "Calle 6 23A 15 Mz C Lo 11",
                  colSpan: 2,
                  alignment: "center",
                },
                {},
              ],
              // Fila con cuatro columnas
              [
                {
                  text: "Destino Económico",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {
                  text: "Uso",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {
                  text: "Área de Terreno",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {
                  text: "Área de Construcción",
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
              ],
              [
                { text: "Habitacional-A", alignment: "center" },
                {
                  text: "Residencial.Vivienda_Hasta_3_Pisos",
                  alignment: "center",
                },
                { text: "91 m²", alignment: "center" },
                { text: "53 m²", alignment: "center" },
              ],
            ],
          },
          marginBottom: 20,
          layout: {
            hLineWidth: function (i, node) {
              return 1; // Grosor del borde horizontal
            },
            vLineWidth: function (i, node) {
              return 1; // Grosor del borde vertical
            },
            hLineColor: function (i, node) {
              return "#000000"; // Color del borde horizontal
            },
            vLineColor: function (i, node) {
              return "#000000"; // Color del borde vertical
            },
          },
        },

        // tabla 2

        {
          table: {
            widths: ["25%", "25%", "25%", "25%"], // Define los anchos de las columnas
            body: [
              // Fila de cabecera con título
              [
                {
                  text: "INFORMACIÓN ECONÓMICA",
                  colSpan: 4,
                  alignment: "center",
                  fillColor: "#D3D3D3",
                  bold: true,
                },
                {},
                {},
                {},
              ],
              // Fila con dos columnas
              [
                {
                  text: "AVALÚO CATASTRAL",
                  colSpan: 2,
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {},
                {
                  text: "AÑO DE VIGENCIA",
                  colSpan: 2,
                  alignment: "center",
                  fillColor: "#ADD8E6",
                  bold: true,
                },
                {},
              ],
              [
                {
                  text: `${certificado.avaluo}`,
                  colSpan: 2,
                  alignment: "center",
                },
                {},
                { text: "2024", colSpan: 2, alignment: "center" },
                {},
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 1; // Grosor del borde horizontal
            },
            vLineWidth: function (i, node) {
              return 1; // Grosor del borde vertical
            },
            hLineColor: function (i, node) {
              return "#000000"; // Color del borde horizontal
            },
            vLineColor: function (i, node) {
              return "#000000"; // Color del borde vertical
            },
          },
        },
        {
            text: "Total de predios: 1 predio", marginBottom: 20
        },
        {
            text: "El presente certificado se expide a solicitud del interesado a los 20 dias del mes de julio del 2024", marginBottom: 50
        },
        {
            stack: [
                {
                    text: "JUANITO PEREZ CONTRERAS", bold: true
                },
                {
                    text: "Subdirector de Planeación"
                }
            ], marginBottom: 10
        },
        {
            text: "Nota: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ],
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
  } catch (error) {
    console.error("Error generating PDF: ", error);
  }
};
