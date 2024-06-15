"use client";

import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Radicacion {
  id: number;
  solicitud: string;
  predial: string;
  fecha: string;
  img: string;
  departamento: string;
  municipio: string;
  direccion: string;
  telefono: string;
  solicitante: string;
  documento: string;
  relacionpredio: string;
  tramitesolicitud: string;
  clasedocumento: string;
  anexo: string;
}

const ConstanciaRadicacion: React.FC = () => {
  const [radicacionId, setRadicacionId] = useState<number | null>(null);
  const [radicacion, setRadicacion] = useState<Radicacion | null>(null);

  const handleSearch = async () => {
    const response = await fetch("/datos.json");
    const data: Radicacion[] = await response.json();
    const foundRadicacion = data.find((p) => p.id === radicacionId);
    setRadicacion(foundRadicacion || null);
  };

  const loadImageAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Failed to load image"));
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const generatePDF = async () => {
    if (!radicacion) return;

    const imgHeader = await loadImageAsBase64("/imgheader.png");
    const imgFooter = await loadImageAsBase64("/imgfooter.png");
    const logo = await loadImageAsBase64("/logo.jpg");

    const docDefinition: TDocumentDefinitions = {
      header: [
        {
          image: imgHeader,
          width: 600,
          margin: [0, 0, 0, 20],
        },
      ],
      footer: function (currentPage, pageCount) {
        return {
          stack: [
            // {
            //   image: imgFooter,
            //   width: 600,
            // },
            {
              text: currentPage.toString() + " / " + pageCount,
              alignment: "right",
              margin: [0, 0, 30, 0],
            },
          ],
        };
      },
      content: [
        {
          columns: [
            {
              columns: [
                {
                  image: logo,
                  width: 80,
                },
                {
                  stack: [
                    {
                      text: "Sintax",
                      bold: true,
                      fontSize: 10,
                    },
                    {
                      text: "Gestión Catastral",
                      fontSize: 8,
                    },
                  ],
                  margin: [0,30,0,0],
                  //   text: "Sintax",
                  //   bold: true,
                  //   fontSize: 10,
                  // },
                  // {
                  //   text: "Gestión Catastral",
                  //   fontSize: 8,
                },
              ],
            },

            {
              width: "50%",
              alignment: "right",
              stack: [
                {
                  qr: "text in QR",
                  fit: 80,
                },
                {
                  text: "Sello de radicacion",
                  fontSize: 8,
                  margin: [0, 5, 0, 0], // Margen superior para separar el texto del QR
                },
              ],
            },
          ],
          margin: [0, 50, 0, 0],
        },
        {
          text: "CONSTANCIA DE RADICACIÓN",
          bold: true,
          fontSize: 14,
          alignment: "center",
          margin: [0, 10],
        },
        { text: "Datos Solicitud", bold: true, alignment: "center" },
        {
          table: {
            widths: ["*", "*", 280],
            body: [
              [
                { text: "Numero Solicitud", bold: true },
                `${radicacion.solicitud}`,
                { text: "Numero Predial Nacional", bold: true },
              ],
              [
                { text: "Fecha Solicitud", bold: true },
                `${radicacion.fecha}`,
                `${radicacion.predial}`,
              ],
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
              [
                `${radicacion.solicitante}`,
                `${radicacion.documento}`,
                `${radicacion.relacionpredio}`,
              ],
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
              [
                `${radicacion.departamento}`,
                `${radicacion.municipio}`,
                `${radicacion.direccion}`,
                `${radicacion.telefono}`,
              ],
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
              [`${radicacion.tramitesolicitud}`, ""],
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
              [`${radicacion.tramitesolicitud}`, `${radicacion.anexo}`],
            ],
          },
        },
      ],
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`Numero de Solicitud_${radicacion.solicitud}.pdf`);
  };

  return (
    <div>
      <input
        type="number"
        value={radicacionId || ""}
        onChange={(e) => setRadicacionId(Number(e.target.value))}
        placeholder="Ingrese ID del predio"
      />
      <button
        className="rounded-sm bg-blue-500 text-white p-3 mt-4 ml-5"
        onClick={handleSearch}
      >
        Buscar
      </button>

      {radicacion && (
        <div className="property-card flex flex-col gap-2 rounded-sm bg-sky-200 p-5 mt-10">
          <h2 className="font-bold text-xl">Constancia de Radicación</h2>
          <p>
            <span className="font-semibold">Numero Solicitud:</span>{" "}
            {radicacion.solicitud}
          </p>

          <button
            className="rounded-sm bg-slate-400 p-3 mt-4"
            onClick={generatePDF}
          >
            Generar Solicitud PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ConstanciaRadicacion;
