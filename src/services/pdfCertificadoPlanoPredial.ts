import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";
import { text } from "stream/consumers";
import test from "node:test";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = async (certificado: Certificado) => {
  const imgHeader = await loadImageAsBase64("/imgheader.png");
  const imgFooter = await loadImageAsBase64("/imgfooter.png");
  const imgBg = await loadImageAsBase64("/imgbg.png");
  const logo = await loadImageAsBase64("/logo.png");
  const predio = await loadImageAsBase64("/predio.png");

  const docDefinition: TDocumentDefinitions = {
    header: {
      image: logo,
      width: 80,
      margin: [20, 10, 0, 0],
    },
    footer: (currentPage, pageCount) => ({
      stack: [
        // { image: imgFooter, width: 400, absolutePosition: { x: 500, y: 750 } },
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
        qr: "text in QR",
        fit: 80,
        alignment: "center",
        marginTop: 30,
        marginBottom: 15,
      },
      {
        text: "CERTIFICADO PLANO PREDIAL CATASTRAL",
        alignment: "center",
        bold: true,
        marginBottom: 20,
        fontSize: 15,
      },
      {
        text: "Información catastral",
        alignment: "center",
        bold: true,
        fontSize: 12,
        marginBottom: 10,
      },
      {
        columns: [
          {
            stack: [
              {
                text: [
                  {
                    text: `Departamento: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.departamento}`,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Municipio: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.municipio}`,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Destino económico: `,
                    bold: true,
                  },
                  {
                    text: `A-Habitacional`,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Matrícula: `,
                    bold: true,
                  },
                  {
                    text: ``,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Dirección: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.direccion}`,
                  },
                ],
              },
            ],
          },
          {
            stack: [
              {
                text: [
                  {
                    text: `Referencia catastral terreno anterior: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.predial}`,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Área terreno: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.areaterreno}`,
                  },
                ],
              },
              {
                text: [
                  {
                    text: `Área construida: `,
                    bold: true,
                  },
                  {
                    text: `${certificado.areaconstruida}`,
                  },
                ],
              },
            ],
          },
        ],
        marginBottom: 20,
      },

      //Imagen de localizacion
      {
        text: "Localización geográfica",
        alignment: "center",
        bold: true,
      },
      {
        image: predio,
        width: 500,
        alignment: "center",
      },
            {
        text: '',  // Contenido vacío para asegurar que el salto de página ocurra
        pageBreak: 'after'
      },


      // TABLAS DE MEDIDAS

      {
        table: {
          widths: ['10%', '20%', '20%', '20%', '10%', '20%'], // Define los anchos de las columnas
          body: [
            [
              { text: 'COORDENADAS', colSpan: 6, alignment: 'center', fillColor: '#D3D3D3', bold: true, fontSize: 14 }, {}, {}, {}, {}, {}
            ],
            [
              { text: 'Nodo', bold: true, alignment: 'center' },
              { text: 'Norte', bold: true, alignment: 'center' },
              { text: 'Este', bold: true, alignment: 'center' },
              { text: 'Distancia (m)', bold: true, alignment: 'center' },
              { text: 'Nodo', bold: true, alignment: 'center' },
              { text: 'Norte', bold: true, alignment: 'center' },
              { text: 'Este', bold: true, alignment: 'center' },
              { text: 'Distancia (m)', bold: true, alignment: 'center' },
            ],
            ...[
              ['A', '1051938.82', '1527247.53', 'A-B: 5.26', 'K', '1051941.8', '1527272.0', 'K-L: 8.37'],
              ['B', '1051938.19', '1527242.31', 'B-C: 8.39', 'L', '1051940.79', '1527263.69', 'L-M: 10.82'],
              ['C', '1051929.89', '1527243.5', 'C-D: 7.9', 'M', '1051939.48', '1527252.95', 'M-A: 5.46'],
              ['D', '1051922.04', '1527244.41', 'D-E: 1.03', 'N', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['E', '1051921.02', '1527244.53', 'E-F: 9.78', 'O', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['F', '1051922.36', '1527254.22', 'F-G: 5.25', 'P', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['G', '1051923.07', '1527259.42', 'G-H: 3.92', 'Q', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['H', '1051923.61', '1527263.3', 'H-I: 10.3', 'R', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['I', '1051925.02', '1527273.51', 'I-J: 8.38', 'S', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX'],
              ['J', '1051933.37', '1527272.76', 'J-K: 8.46', 'T', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX']
            ].map(row => row.map(cell => ({ text: cell, alignment: 'center', fontSize: 10 })))
          ]
        },
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
