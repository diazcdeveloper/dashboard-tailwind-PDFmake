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
          },
          {
            width: "50%",
            alignment: "right",
            stack: [
              { qr: "text in QR", fit: 80 },
              { text: "Sello de radicacion", fontSize: 8, margin: [0, 5, 0, 0] },
            ],
          },
        ],
        margin: [0, 0, 0, 0],
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
          widths: ['5%', '15%', '15%', '15%', '5%', '15%', '15%', '15%' ], // Define los anchos de las columnas
          body: [
            [
              { text: 'COORDENADAS', colSpan: 8, alignment: 'center', fillColor: '#D3D3D3', bold: true, fontSize: 14 }, {}, {}, {}, {}, {}, {}, {}
            ],
            [
              { text: 'Nodo', bold: true, alignment: 'center', fontSize: 8, fillColor: "#ADD8E6"},
              { text: 'Norte', bold: true, alignment: 'center', fillColor: "#ADD8E6"},
              { text: 'Este', bold: true, alignment: 'center', fillColor: "#ADD8E6"},
              { text: 'Distancia (m)', bold: true, alignment: 'center', fontSize: 8, fillColor: "#ADD8E6"},
              { text: 'Nodo', bold: true, alignment: 'center', fontSize: 8, fillColor: "#ADD8E6"},
              { text: 'Norte', bold: true, alignment: 'center', fillColor: "#ADD8E6"},
              { text: 'Este', bold: true, alignment: 'center', fillColor: "#ADD8E6"},
              { text: 'Distancia (m)', bold: true, alignment: 'center', fontSize: 8, fillColor: "#ADD8E6"},
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
        marginTop: 60,
        marginBottom: 30
      },
      {
        table: {
          widths: ['30%', '40%', '30%'], // Anchos de las columnas
          body: [
            [
              {
                text: 'Proyección: PCS_SUCRE_SINCELEJO\nOrigen: PCS_SUCRE_SINCELEJO\nFalso Este: 856.534,454 m\nFalso Norte: 1.520.206,339 m\nMeridiano Central: -75,38321586\nLatitud Origen: 9,29768248',
                alignment: 'left',
                margin: [0, 10, 0, 10], // Márgenes para un poco de espacio alrededor del texto
                fontSize: 8
              },
              {
                text: 'CONVENCIONES', alignment: 'center', margin: [0, 10, 0, 10]
              },
              {
                stack: [
                  { text: 'FIRMA AUTORIZADA', bold: true, alignment: 'center', margin: [0, 0, 0, 20], fontSize: 10 },
                  { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 10] }, // Línea para la firma
                  {
                    columns: [
                      { text: 'Director de Catastro', alignment: 'center', fontSize: 8 },
                      { text: 'Fecha de generación:\n24/11/2022', alignment: 'center', fontSize: 8 }
                    ]
                  }
                ],
                alignment: 'center',
                margin: [0, 10, 0, 10]
              }
            ]
          ]
        },
        marginBottom: 30
      },
      {
        table: {
          widths: ['30%', '70%'], // Define los anchos de las columnas
          body: [
            [
              { text: 'Se expide con las especificaciones técnicas establecidas en el artículo 19 de la resolución conjunta IGAC N° 1101 SNR N° 11344 del 31-12-2020', fontSize: 10, alignment: 'left', margin: [10, 10, 10, 10] },
              { 
                stack:[
                  {
                    text: 'OBSERVACIONES', bold: true, alignment: 'center'
                  },
                  {
                    text: 'Derechos reservados. Para la reproducción parcial o total de la presente obra se requiere la previa autorización del AMBQ. El texto, la cartografía y gráficos están sujetos a derechos de copia y de propiedad intelectual (Ley 23 de 1982) (C) IGAC, 2017.\n\nNOTA: Si tiene comentarios u observaciones con respecto a este producto, favor escríbanos al correo electrónico.\n\nRESOLUCIÓN 1149 Ago 19/21 ARTÍCULO 29. Efecto Jurídico de la Inscripción Catastral. La inscripción en el catastro no constituye título de dominio, ni sanea los vicios de que adolezca la titulación presentada o la posesión del interesado, y no puede alegarse como excepción contra el que pretenda tener mejor derecho a la propiedad o posesión del predio.',
                    fontSize: 8, alignment: 'left', margin: [10, 10, 10, 10]
                  }
                ]

              }
            ],
          ]
        },
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
