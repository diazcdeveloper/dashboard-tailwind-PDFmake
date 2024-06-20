import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = async (certificado: Certificado) => {
  const imgHeader = await loadImageAsBase64("/imgheader.png");
  const imgFooter = await loadImageAsBase64("/imgfooter.png");
  const imgBg = await loadImageAsBase64("/imgbg.png");
  const logo = await loadImageAsBase64("/logo.png");

  const docDefinition: TDocumentDefinitions = {
    // header: [{ image: imgHeader, width: 600, marginTop: -30 }],
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
        image: logo,
        width: 80,
        marginTop: 20,
      },
      {
        text: `CERTIFICADO INSCRIPCIÓN CATASTRAL No ${certificado.numerocertificado}`,
        alignment: "center",
        bold: true,
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
      },
      {
        text:`Expedido en ${certificado.municipio} el ${certificado.fecha}`, marginTop: 30, marginBottom: 90
      },
      {
        text: "XXXXXXXXXXXXXXX", bold: true, marginBottom: 20, alignment: "center"
      },
      {
        text: "Subdirector de departamento administrativo", marginBottom: 20, alignment: "center"
      },
      {
        text: "Firme mecánica autorizada mediante resolución 4131.01021.0014 del 30 de enaro de 2020 del Departamento Admnistrativo de Hacienda Municipal.", marginBottom: 20
      },
      {
        text: certificado.subdirector_sincelejo, marginBottom: 20
      },
      {
        text: `Este cerfificado NO es valido sin estampilla para cualquier trámite. Este documento es propiedad de la Administración Central del Municipio de ${certificado.municipio}. Prohibida su alteración o modificación por cualquier medio, sin previa autorización del Alcalde del Municipio de ${certificado.municipio}.`
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
