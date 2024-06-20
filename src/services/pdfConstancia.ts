import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Certificado } from "@/types";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = async (radicacion: Certificado) => {
  const imgHeader = await loadImageAsBase64("/imgheader.png");
  const imgFooter = await loadImageAsBase64("/imgfooter.png");
  const imgBg = await loadImageAsBase64("/imgbg.png");
  const logo = await loadImageAsBase64("/logo.jpg");

  const docDefinition: TDocumentDefinitions = {
    header: [{ image: imgHeader, width: 600 }],
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
      absolutePosition: { x: (pageSize.width - 600) / 2, y: (pageSize.height - 600) / 2 },
      opacity: 0.1,
    }),
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
            margin: [0, 10, 0, 0],
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
        margin: [0, 50, 0, 0],
      },
      { text: "CONSTANCIA DE RADICACIÓN", bold: true, fontSize: 14, alignment: "center", margin: [0, 10] },
      { text: "Datos Solicitud", bold: true, alignment: "center" },
      {
        table: {
          widths: ["*", "*", 280],
          body: [
            [
              { text: "Numero Solicitud", bold: true },
              radicacion.solicitud,
              { text: "Numero Predial Nacional", bold: true },
            ],
            [{ text: "Fecha Solicitud", bold: true }, radicacion.fecha, radicacion.predial],
          ],
        },
      },
      {
        text: "Datos Solicitante",
        bold: true,
        margin: [0, 30, 0, 0],
        alignment: "center",
      },
      {
        table: {
          widths: ["*", "*", 140],
          body: [
            [
              { text: "Solicitado Por", bold: true },
              { text: "Numero de Documento", bold: true },
              { text: "Relación predio", bold: true },
            ],
            [radicacion.solicitante, radicacion.documento, radicacion.relacionpredio],
          ],
        },
      },
      {
        text: "Datos De Ubicación del Solicitante",
        bold: true,
        margin: [0, 30, 0, 0],
        alignment: "center",
      },
      {
        table: {
          widths: ["*", "*", 150, 150],
          body: [
            [
              { text: "Departamento", bold: true },
              { text: "Municipio", bold: true },
              { text: "Dirección", bold: true },
              { text: "Teléfono", bold: true },
            ],
            [radicacion.departamento, radicacion.municipio, radicacion.direccion, radicacion.telefono],
          ],
        },
      },
      {
        text: "Detalle Solicitud",
        bold: true,
        margin: [0, 30, 0, 0],
        alignment: "center",
      },
      {
        table: {
          widths: ["*", 320],
          body: [
            [
              { text: "Trámite Solicitud", bold: true },
              { text: "Observación", bold: true },
            ],
            [radicacion.tramitesolicitud, ""],
          ],
        },
      },
      { text: "Detalle Solicitud", margin: [0, 30, 0, 0] },
      {
        table: {
          widths: ["*", 320],
          body: [
            [
              { text: "Clase Documento", bold: true },
              { text: "Anexo", bold: true },
            ],
            [radicacion.tramitesolicitud, radicacion.anexo],
          ],
        },
      },
    ],
  };

  pdfMake.createPdf(docDefinition).download(`Numero de Solicitud_${radicacion.solicitud}.pdf`);
};