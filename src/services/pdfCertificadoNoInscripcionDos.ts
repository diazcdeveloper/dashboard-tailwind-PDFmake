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
     

      // CONTENIDO

      {
        text: 'CERTIFICADO CATASTRAL DE NO PROPIEDAD', alignment: 'center', bold: true, color: '#18171c', marginTop: 20, marginBottom: 15
      },
      {
        text:'La Directora de Rentas, en uso de las facultades conferidas por la Ley 1955 de 2019, el Decreto 1983 de 2019, el Decreto 148 de 2020, la Resolución 1030 de 2020 expedida por el IGAC, el Decreto Municipal 414 de 2022,', marginBottom: 15
      },
      {
        text: 'CERTIFICA', alignment: 'center', bold: true, color: '#18171c', marginBottom: 20
      },
      {
        text: 'Que consultada la base de datos catastal, la siguiente información:', marginBottom: 10
      },
      {
        table: {
          widths: ['50%', '25%', '25%'], // Define los anchos de las columnas
          body: [
            [
              { text: 'Nombre completo', fillColor: '#ADD8E6', bold: true, alignment: 'center' },
              { text: 'Tipo documento', fillColor: '#ADD8E6', bold: true, alignment: 'center' },
              { text: 'N° documento', fillColor: '#ADD8E6', bold: true, alignment: 'center' }
            ],
            [
              { text: `${certificado.solicitante}`, alignment: 'center' },
              { text: 'CC', alignment: 'center' },
              { text: `${certificado.documento}`, alignment: 'center' }
            ]
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return 1; // Grosor del borde horizontal
          },
          vLineWidth: function (i, node) {
            return 1; // Grosor del borde vertical
          },
          hLineColor: function (i, node) {
            return '#000000'; // Color del borde horizontal
          },
          vLineColor: function (i, node) {
            return '#000000'; // Color del borde vertical
          }
        }
      },
      {
        text: 'NO se encuentra inscrito(a) como propietario(a) de bienes inmuebles. El presente certificado se expide para USO PERSONAL.', marginTop: 30, marginBottom: 20
      },
      {
        text: 'El presente certificado se expide a solicitud del interesado a los 25 del mes de noviembre del 2022', marginBottom: 50
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 15] }, // Línea para separar
      {
        text: 'NOMBRE DE DIRECTOR DE CATASTRO', bold: true
      },
      {
        text: 'Directora de catastro', bold: true, marginBottom: 40
      },
      {
        text: 'Notas: "La inscripción en el catastro no constituye título de dominio, ni sanea los vicios de que adolezca la titulación presentada o la posesión del interesado, y no puede alegarse como excepción contra el que pretenda tener mejor derecho a la propiedad o posesión del predio". Artículo 42 Resolución 070 de 2011 Instituto Geográfico Agustín Codazzi; en consonancia con el Parágrafo del Articulo 2.2.2.2.8 del Decreto 148 de 2020. \n La base de datos catastral de la Alcaldía de Sincelejo solo registra información de los municipios para los cuales fue habilitado, es decir, el municipio de Sincelejo urbano, rural. El propietario o poseedor está obligado a: Cerciorarse de que todos los predios de su propiedad o posesión estén incorporados en el Catastro, con la información actualizada; informar a la autoridad catastral los datos actuales, para que los cambios en los aspectos físicos, jurídicos y económicos se asuman en los procesos catastrales y a suministrar datos, documentos y facilitar la obtención y captura de información, para el desarrollo de la actividad catastral (Art. 152, Resolución 70 de 2011 del IGAC.', fontSize: 6
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
