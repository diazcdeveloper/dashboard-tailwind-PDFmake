import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";
import { Bold } from "lucide-react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = async (certificado: Certificado) => {
  const imgHeader = await loadImageAsBase64("/imgheader.png");
  const imgFooter = await loadImageAsBase64("/imgfooter.png");
  const imgBg = await loadImageAsBase64("/imgbg.png");
  const logo = await loadImageAsBase64("/logo.jpg");

  const docDefinition: TDocumentDefinitions = {
    header: [{ image: imgHeader, width: 600, marginTop: -30 }],
    footer: (currentPage, pageCount) => ({
      stack: [
        { image: imgFooter, width: 400, absolutePosition: { x: 500, y: 750 } },
        {
          text: `${currentPage} / ${pageCount}`,
          alignment: "right",
          margin: [0, 0, 30, 0],
        },
      ],
    }),
    background: (currentPage, pageSize) => ({
      image: imgBg,
      width: 600,
      height: 600,
      absolutePosition: {
        x: (pageSize.width - 600) / 2,
        y: (pageSize.height - 600) / 2,
      },
      opacity: 0.1,
    }),
    content: [
      {
        image: logo,
        width: 80,
        marginTop: 40,
      },
      {
        text: `CERTIFICADO INSCRIPCIÓN CATASTRAL No ${certificado.numerocertificado}`,
        alignment: "center",
        bold: true,
        marginBottom: 20,
      },
      {
        text: "anexo 1",
        fontSize: 8,
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  { text: "CERTIFICADO", marginBottom: 10 },
                  { text: certificado.solicitante, marginBottom: 20 },
                  {
                    text: `Con el documento de identificación No. ${certificado.documento}`,
                    marginBottom: 20,
                  },
                  {
                    text: `"NO REGISTRA INSCRIPCIÓN CATASTRAL EN EL MUNICIPIO DE ${certificado.municipio}, sin embargo aparece(n) el (los) siguiente(s) predio(s) con el mismo nombre pero con diferente o sin ningún documento de identificación:`,
                  },
                ],
                margin: [10, 10]
              }
            ]
          ]
        },
        margin: [0, 20, 0, 20] // Margen alrededor de la tabla
      }
      // {
      //   stack:[
      //     {text: 'CERTIFICADO'},
      //     {text: certificado.solicitante, marginBottom: 20},
      //     {text: `Con el documento de identificación No. ${certificado.documento}`, marginBottom: 20},
      //     // condicional para la respuesta, si existe, se envia respuesta de existencia y datos.
      //     // si no existe se envia respuesta de que no tiene inscripcion con el nombre del municipio
      //     {text: `"NO REGISTRA INSCRIPCIÓN CATASTRAL EN EL MUNICIPIO DE ${certificado.municipio}, sin embargo aparece(n) el (los) siguiente(s) predio(s) con el mismo nombre pero con diferente o sin ningún documento de identificación:`}
      //   ],
      //   margin: [10, -180, 10, 10] // Padding: [left, top, right, bottom]
      // }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
