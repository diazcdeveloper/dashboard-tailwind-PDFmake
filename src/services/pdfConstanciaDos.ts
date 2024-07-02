import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";
import { text } from "stream/consumers";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const generatePDF = async (certificado: Certificado) => {
  const imgHeader = await loadImageAsBase64("/imgheader.png");
  const imgFooter = await loadImageAsBase64("/imgfooter.png");
  const imgBg = await loadImageAsBase64("/imgbg.png");
  const logo = await loadImageAsBase64("/logo.png");

  const docDefinition: TDocumentDefinitions = {
    footer: (currentPage, pageCount) => ({
      stack: [
        { image: imgFooter, width: 400, absolutePosition: { x: 500, y: 750 } },
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
        opacity: 1 // Ajusta la opacidad si es necesario
      };
    },
    content: [
        {
            columns: [
              {
                columns: [
                  { image: logo, width: 70 },
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
                  { qr: "text in QR", fit: 70 },
                  { text: "Sello de radicacion", fontSize: 8, margin: [0, 5, 0, 0] },
                ],
              },
            ],
            marginBottom: 20
          },
        {
            text: 'CONSTANCIA RADICACIÓN', alignment: 'center', bold: true, marginBottom: 20
        },
        {
            columns:[
                {
                    stack: [
                        {
                            text: 'Datos Solicitud', alignment: 'center', fontSize: 12, bold: true, marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: ' Numero Solicitud: ', bold: true
                                },
                                {
                                    text: `${certificado.solicitud}`
                                }
                            ]
                        },
                        {
                            text: [
                                {
                                    text: ' Fecha Solicitud: ', bold: true
                                },
                                {
                                    text: `${certificado.fecha}`
                                }
                            ]
                        },
                    ]
                },
                {
                    stack: [
                        {
                            text: 'Datos Solicitante', alignment: 'center', fontSize: 12, bold: true, marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Solicitado Por: ', bold: true
                                },
                                {
                                    text: `${certificado.solicitante}`
                                }
                            ]
                        },
                        {
                            text: [
                                {
                                    text: 'Número de documento: ', bold: true
                                },
                                {
                                    text: `${certificado.documento}`
                                }
                            ]
                        },
                        {
                            text: [
                                {
                                    text: 'Relación predial: ', bold: true
                                },
                                {
                                    text: `Propietario`
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
