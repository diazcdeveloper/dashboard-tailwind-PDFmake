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
    // header: [{ image: imgHeader, width: 600 }],
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
        opacity: 1 // Ajusta la opacidad si es necesario
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
        marginBottom: 20
      },

      // CUERPO DEL DOCUMENTO

      {
        text: `RESOLUCIÓN NRO: ${certificado.resolucion}  Fecha: ${certificado.fecha}`, bold: true, alignment: "center", marginBottom: 20
      },
      {
        text: `POR MEDIO DEL CUAL SE ORDENAN UNOS CAMBIOS EN LA INFORMACION CATASTRAL DEL ÁREA METROPOLITANA DE ${certificado.municipio}`, alignment: "center", marginBottom: 20, fontSize: 10
      },
      {
        text: "La Subdirección de Planeación Territorial del Área Metropolitana de Barranquilla - AMB, en el ejercicio de las facultades constitucionales y legales, especialmente de las conferidas por el artículo 79 de la Ley 1955 de 2019 modificado por el artículo 43 de la Ley 2294 de 2023, lo establecido en la Resolución 1149 de 2021 vigente hasta el 31 de diciembre de 2023 de conformidad con lo dispuesto en los artículos 8.4 y 8.5 de la Resolución Única 1044 expedida por la Dirección General del IGAC el 08 de agosto de 2023, en concordancia con la Ley 14 de 1983 y", marginBottom: 20, fontSize: 8
      },
      {
        text: "CONSIDERANDO", bold: true, alignment: "center", marginBottom: 10, fontSize: 8
      },
      {
        text: "Que el señor AREA METROPOLITANA DE BARRANQUILLA, identificado con nit. No. 800055568, en su condición de gestor, del predio identificado con la referencia catastral No. 082960101010100010001000000000, del municipio de GALAPA, solicitó mediante comunicación radicada 01- 301-2023-0003509 de fecha 31/10/2023, el procedimiento catastral de mutación de novena clase, soportado en los siguientes documentos justificativos: acto administrativo numero 12121 del 2023-10-31, , copia del c al No. 122-121212, de fecha.", marginBottom: 10, fontSize: 8
      },
      {
        text: `{MATRICULA}XX2022, procede una mutación de novena clase y su correspondiente inscripción en el Catastro del Área Metropolitana de Barranquilla, conforme lo indican los artículos 15, 21, 29, 30, 31, 45 y 72 de la Resolución 1149 del 2021 expedida por la Dirección General del Instituto Geográfico Agustín Codazzi.`, marginBottom: 10, fontSize: 8
      },
      {
        text: "RESUELVE", bold: true, alignment: "center", marginBottom: 10, fontSize: 8
      },
      {
        text: `ARTÍCULO PRIMERO: Ordenar la inscripción en los registros catastrales del ÁREA METROPOLITANA ${certificado.municipio}, de los siguientes cambios: `, fontSize: 8, marginBottom: 20
      },

      // TABLA

      {
        table: {
            widths: ["33%", "33%", "34"],
            body: [
                [
                    {
                        text: ""
                    },
                    {
                        text: "CANCELA", bold: true, alignment: "center"
                    },
                    {
                        text: "INSCRIBE", bold: true, alignment: "center"
                    }
                ],
                [
                    {
                        text: "Interesados", bold: true
                    },
                    {
                        stack: [
                            {
                                text: `Fulanito De tal -- Cc ${certificado.documento} -- 50%`
                            }
                        ]
                    }
                ]
            ]
        }
      }

    ],
  };

  pdfMake.createPdf(docDefinition).download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};