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
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
