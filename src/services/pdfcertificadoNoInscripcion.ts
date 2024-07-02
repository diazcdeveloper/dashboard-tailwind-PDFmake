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

    footer: (currentPage, pageCount) => ({
      text: `Página ${currentPage} de ${pageCount}`,
      alignment: "right",
      margin: [0, 0, 30, 0],
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
              {
                text: "Sello de radicacion",
                fontSize: 8,
                margin: [0, 5, 0, 0],
              },
            ],
          },
        ],
      },
      {
        text: "CERTIFICADO DE NO TENER INSCRITO EN CATASTRO BIENES INMUEBLES CERTIFICADOS",
        alignment: "center",
        marginTop: 30,
        marginBottom: 30,
        bold: true,
      },
      {
        text: "El propietario o peseedor está obligado a: Certificarse de que todos los predios de su propiedad o posesión estén incorporados en el catastro, con la información actualizada; informar a la autoridad catastral los datos actuales, para que los cambios en los aspectos físicos, jurídicos y económicos se asuman en los procesos catastrales y a suministrar datos, documentos y facilitar la obtención y captura de información, para el desarrollo de la actividad catastral (Art. 152, Resolución 70 de 2011 del IGAC)",
        marginBottom: 40,
      },
      {
        text: "La Subdirección de Catastro Certifica Que:",
        marginBottom: 20,
        alignment: "center",
        fontSize: 10,
        bold: true,
      },
      {
        text: `${certificado.solicitante} CON CÉDULA DE CIUDADANIA No ${certificado.documento}`,
        marginBottom: 20,
        alignment: "center",
        bold: true,
      },
      {
        text: `NO FIGURA INSCRITO EN ESTA OFICINA COMO PROPIETARIO O POSEEDOR DE BIENES INMUEBLES EN EL MUNICIPIO DE ${certificado.municipio}`,
        marginBottom: 20,
      },
      {
        text: `Valido hasta 30 dias despues de la fecha ${certificado.fecha}`,
      },
      {
        text: `Generado por: ${certificado.subdirector_sincelejo} - ${certificado.municipio}`, marginBottom: 80
      },
      {
        text: 'FIRMAxxx', alignment: 'center'
      },
      {
        text: 'GERENTE', alignment: 'center', bold: true
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
