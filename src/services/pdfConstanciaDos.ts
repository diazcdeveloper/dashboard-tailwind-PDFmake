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

  const colorLetras = '#666666'

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
            marginBottom: 10
          },
        {
            text: 'CONSTANCIA RADICACIÓN', alignment: 'center', bold: true, marginBottom: 20, color: '#1d1d1d', fontSize: 20
        },

        // DATOS SOLICITUD

        {
            columns:[
                {
                    stack: [
                        {
                            text: 'Datos Solicitud', alignment: 'center', fontSize: 15, bold: true, marginBottom: 15
                        },
                        {
                            text: [
                                {
                                    text: 'Numero Solicitud: ', bold: true
                                },
                                {
                                    text: `${certificado.solicitud}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Fecha Solicitud: ', bold: true
                                },
                                {
                                    text: `${certificado.fecha}`, color: `${colorLetras}`
                                }
                            ]
                        },
                    ]
                },

                // DATOS SOLICITANTE

                {
                    stack: [
                        {
                            text: 'Datos Solicitante', alignment: 'center', fontSize: 15, bold: true, marginBottom: 15
                        },
                        {
                            text: [
                                {
                                    text: 'Solicitado Por: ', bold: true
                                },
                                {
                                    text: `${certificado.solicitante}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Número de documento: ', bold: true
                                },
                                {
                                    text: `${certificado.documento}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Relación predial: ', bold: true
                                },
                                {
                                    text: `Propietario`, color: `${colorLetras}`
                                }
                            ]
                        }
                    ]
                }
            ],
            marginBottom: 20
        },

        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 10] }, // Línea para separar

        // DATOS DE UBICACION

        {
            columns:[
                {
                    stack: [
                        {
                            text: 'Datos De Ubicación \ndel Solicitante', alignment: 'center', fontSize: 15, bold: true, marginBottom: 15
                        },
                        {
                            text: [
                                {
                                    text: 'Departamento: ', bold: true
                                },
                                {
                                    text: `${certificado.departamento}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Municipio: ', bold: true
                                },
                                {
                                    text: `${certificado.municipio}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Dirección: ', bold: true
                                },
                                {
                                    text: `${certificado.direccion}`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Teléfono: ', bold: true
                                },
                                {
                                    text: `${certificado.telefono}`, color: `${colorLetras}`
                                }
                            ]
                        },
                    ]
                },
                {
                    stack: [
                        {
                            text: 'Detalle Solicitud', alignment: 'center', fontSize: 15, bold: true, marginBottom: 15
                        },
                        {
                            text: [
                                {
                                    text: 'Trámite Solicitud: ', bold: true
                                },
                                {
                                    text: `Mutacuines de primera clase`, color: `${colorLetras}`
                                }
                            ],
                            marginBottom: 5
                        },
                        {
                            text: [
                                {
                                    text: 'Observación: ', bold: true
                                },
                                {
                                    text: ``, color: `${colorLetras}`
                                }
                            ]
                        },
                    ]
                }
            ]
        },

        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 15] }, // Línea para separar

        // DETALLE SOLICITUD
        {
            text: 'Detalle Solicitud', bold: true, fontSize: 15, marginBottom: 15
        },
        {
            text: [
                {
                    text: 'Clase Documento: ', bold: true
                },
                {
                    text: ''
                }
            ],
            marginBottom: 5
        },
        {
            text: [
                {
                    text: 'Anexo: ', bold: true
                },
                {
                    text: 'Documento_prueba.pdf', color: `${colorLetras}`
                }
            ]
        }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
