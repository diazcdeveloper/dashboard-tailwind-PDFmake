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
        marginBottom: 20,
      },

      // CUERPO DEL DOCUMENTO

      {
        text: `RESOLUCIÓN NRO: ${certificado.resolucion}  Fecha: ${certificado.fecha}`,
        bold: true,
        alignment: "center",
        marginBottom: 20,
      },
      {
        text: `POR MEDIO DEL CUAL SE ORDENAN UNOS CAMBIOS EN LA INFORMACION CATASTRAL DEL ÁREA METROPOLITANA DE ${certificado.municipio}`,
        alignment: "center",
        marginBottom: 20,
        fontSize: 10,
      },
      {
        text: "La Subdirección de Planeación Territorial del Área Metropolitana de Barranquilla - AMB, en el ejercicio de las facultades constitucionales y legales, especialmente de las conferidas por el artículo 79 de la Ley 1955 de 2019 modificado por el artículo 43 de la Ley 2294 de 2023, lo establecido en la Resolución 1149 de 2021 vigente hasta el 31 de diciembre de 2023 de conformidad con lo dispuesto en los artículos 8.4 y 8.5 de la Resolución Única 1044 expedida por la Dirección General del IGAC el 08 de agosto de 2023, en concordancia con la Ley 14 de 1983 y",
        marginBottom: 20,
        fontSize: 8,
      },
      {
        text: "CONSIDERANDO",
        bold: true,
        alignment: "center",
        marginBottom: 10,
        fontSize: 8,
      },
      {
        text: "Que el señor AREA METROPOLITANA DE BARRANQUILLA, identificado con nit. No. 800055568, en su condición de gestor, del predio identificado con la referencia catastral No. 082960101010100010001000000000, del municipio de GALAPA, solicitó mediante comunicación radicada 01- 301-2023-0003509 de fecha 31/10/2023, el procedimiento catastral de mutación de novena clase, soportado en los siguientes documentos justificativos: acto administrativo numero 12121 del 2023-10-31, , copia del c al No. 122-121212, de fecha.",
        marginBottom: 10,
        fontSize: 8,
      },
      {
        text: `{MATRICULA}XX2022, procede una mutación de novena clase y su correspondiente inscripción en el Catastro del Área Metropolitana de Barranquilla, conforme lo indican los artículos 15, 21, 29, 30, 31, 45 y 72 de la Resolución 1149 del 2021 expedida por la Dirección General del Instituto Geográfico Agustín Codazzi.`,
        marginBottom: 10,
        fontSize: 8,
      },
      {
        text: "RESUELVE",
        bold: true,
        alignment: "center",
        marginBottom: 10,
        fontSize: 8,
      },
      {
        text: `ARTÍCULO PRIMERO: Ordenar la inscripción en los registros catastrales del ÁREA METROPOLITANA ${certificado.municipio}, de los siguientes cambios: `,
        fontSize: 8,
        marginBottom: 20,
      },

      // TABLA

      {
        table: {
          widths: ["33%", "33%", "34%"],
          body: [
            [
              {
                text: "",
              },
              {
                text: "CANCELA",
                bold: true,
                alignment: "center",
                fillColor: "#D3D3D3"
              },
              {
                text: "INSCRIBE",
                bold: true,
                alignment: "center",
                fillColor: "#D3D3D3"
              },
            ],
            [
              {
                text: "Interesados",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                stack: [
                  {
                    text: `Fulanito De tal -- Cc ${certificado.documento} -- 50%`,
                    fontSize: 8,
                  },
                  {
                    text: `${certificado.solicitante} -- Cc ${certificado.documento} -- 50%`,
                    fontSize: 8,
                  },
                ],
              },
              {
                text: "Harold Diaz -- Cc 1.102.806.702 -- 100%",
                fontSize: 8,
              },
            ],
            [
              {
                text: "Dirección",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                text: `${certificado.municipio} - ${certificado.direccion}`,
                fontSize: 10,
              },
              {
                text: `${certificado.municipio} - ${certificado.direccion}`,
                fontSize: 10,
              },
            ],
            [
              {
                text: "Matricula",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                text: `${certificado.matricula}`,
                fontSize: 10,
              },
              {
                text: `${certificado.matricula}`,
                fontSize: 10,
              },
            ],
            [
              {
                text: "Área terreno",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                text: `${certificado.areaterreno}`,
                fontSize: 10,
              },
              {
                text: `${certificado.areaterreno}`,
                fontSize: 10,
              },
            ],
            [
              {
                text: "Área construida",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                text: `${certificado.areaconstruida}`,
                fontSize: 10,
              },
              {
                text: `${certificado.areaconstruida}`,
                fontSize: 10,
              },
            ],
            [
              {
                text: "Avaluo Catastral",
                bold: true,
                fillColor: "#ADD8E6"
              },
              {
                text: `${certificado.avaluo}`,
                fontSize: 10,
              },
              {
                text: `${certificado.avaluo}`,
                fontSize: 10,
              },
            ],
          ],
        },
      },

      // ARTICULOS

      {
        text: "ARTÍCULO SEGUNDO: La presente providencia queda notificada en la fecha de su expedición, de conformidad a lo dispuesto en el artículo 70 de la Ley 1437 de2011, en el cumplimiento de lo previsto en el artículo 56 de la Resolución 1149 del 2021 expedida por el Instituto Geográfico Agustín Codazzi -IGAC. \nARTÍCULO TERCERO: Comuníquese el contenido de la presente providencia al titular del derecho de dominio, dentro de los cinco (5) días siguientes a la correspondiente anotación en los registros catastrales de acuerdo con lo ordenado en el artículo 70 de la Ley 1437 de 2011 CPACA. \n ARTÍCULO CUARTO: El incremento anual del avalúo catastral estará sujeto al incremento que ordene el gobierno nacional, cuando no se realice actualización de la formación catastral.\nARTÍCULO QUINTO: El presente acto rige a partir de su expedición.", fontSize: 8, marginBottom: 20, marginTop: 10
      },
      {
        text: "NOTIFÍQUESE, COMUNÍQUESE Y CÚMPLASE", bold: true, alignment: "center"
      },

      // SIGUIENTE PAGINA

      {
        text: '',  // Contenido vacío para asegurar que el salto de página ocurra
        pageBreak: 'after'
      },
      {
        text: `dado en ${certificado.municipio} en la fecha ${certificado.fecha}`, marginTop: 60, marginBottom: 60
      },
      { 
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], margin: [0, 10, 0, 10] 
      }, // Línea para la firma
      {
        text: "NOMBRE SUBDIRECTOR planeación territorial"
      },
      {
        text: "Subdirector Planeación Territorial", bold: true, marginBottom: 30
      },
      {
        text: "Aprobado: Admin Admin Admin Admin- Asesora Jurídico\nRevisión jurídica: Admin Admin Admin Admin - Asesora Externa En\nRevisión técnica: Admin Admin Admin Admin - Asesor Aspectos Técnicos\nProyectó: Admin Admin Admin Admin -ejecutor – Contratista"
      }
    ],
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Numero de Solicitud_${certificado.solicitud}.pdf`);
};
