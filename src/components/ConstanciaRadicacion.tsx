"use client";

import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Bold } from "lucide-react";
import { text } from "stream/consumers";
import {
  Content,
  ContentImage,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Radicacion {
  id: number;
  solicitud: string;
  predial: string;
  fecha: string;
  img: String;
  departamento:string;
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

  const generatePDF = () => {
    if (!radicacion) return;

    const logo: Content = {
      image: 'src/assets/imgheader.png',
      width: 100,
    }


    // Definición del documento PDF
    const docDefinition: TDocumentDefinitions = {
      header:{
        columns:[
          {
            text: [
              {text:'Sictax\n', bold: true, fontSize: 15},
              {text: 'Gestion Catastral'},
            ]
          },
          {
            text: 'QR\n\n', alignment:'right', bold: true, fontSize: 30
          },
        ],
      },
      content:[
        
        {text:'CONSTANCIA DE RADICACIÓN', bold: true, fontSize: 20, alignment: "center",  margin: [40,20]},
        {
          text: 'Datos Solicitud', alignment: 'center'
        },
        //tabla solicitud
        {
          table: {
            widths: ['*', '*', 280],
            body: [
              ['Numero Solicitud', `${radicacion.solicitud}`, 'Numero Predial Nacional'],
              ['Fecha Solicitud', `${radicacion.fecha}`, `${radicacion.predial}`]
            ]
          }
        },
        {
          text: 'Datos Solicitante', margin: [0, 30, 0, 0], alignment: 'center'
        },
        //tabla solicitante
        {
          table: {
            widths: ['*', '*', 140],
            body: [
              ['Solicitado Por', 'Número de Documento', 'Relación Predio'],
              [`${radicacion.solicitante}`, `${radicacion.documento}`, `${radicacion.relacionpredio}`]
            ]
          }
        },
        {
          text: 'Datos De Ubicación del Solicitante', margin: [0, 30, 0, 0], alignment: 'center'
        },
        //tabla ubicacion del solicitante
        {
          table: {
            widths: ['*', '*', 150, 150],
            body: [
              ['Departamento', 'Municipio', 'Dirección', 'Teléfono'],
              [`${radicacion.departamento}`, `${radicacion.municipio}`, `${radicacion.direccion}`, `${radicacion.telefono}`]
            ]
          }
        },
        {
          text: 'Detalle Solicitud', margin: [0, 30, 0, 0], alignment: 'center'
        },
        //tabla Detalle Solicitud
        {
          table: {
            widths: ['*', 320],
            body: [
              ['Tramite Solicitado', 'Observación'],
              [`${radicacion.tramitesolicitud}`, '']
            ]
          }
        },
        {
          text: 'Detalle Solicitud', margin: [0, 30, 0, 0]
        },
        //tabla Documentos Aportados
        {
          table: {
            widths: ['*', 320],
            body: [
              ['Clase Documento', 'Ane'],
              [`${radicacion.tramitesolicitud}`, `${radicacion.anexo}`]
            ]
          }
        }
      ]
    };

    pdfMake.createPdf(docDefinition).download(`Numero de Solicitud_${radicacion.solicitud}.pdf`);
  };

  return (
    <div>
      {/* Input para ingresar el ID del predio */}
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

      {/* Mostrar la información del predio si se encuentra */}
      {radicacion && (
        <div className="property-card flex flex-col gap-2 rounded-sm bg-sky-200 p-5  mt-10">
          <h2 className="font-bold text-xl">Constancia de Radicación</h2>
          <p>
            {" "}
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
