
"use client";

import React, { useState } from "react";
import { fetchData } from "@/services/api";
import { generatePDF } from "@/services/pdfCertificadoNoInscripcionDos";
import { Certificado } from "@/types";

const CertificadoNoInscripcionDos: React.FC = () => {
  const [inscripcionId, setInscripcionId] = useState<number | null>(null);
  const [inscripcion, setInscripcion] = useState<Certificado | null>(null);

  const handleSearch = async () => {
    const data = await fetchData();
    const foundinscripcion = data.find((p) => p.id === inscripcionId);
    setInscripcion(foundinscripcion || null);
  };

  const handleGeneratePDF = async () => {
    if (!inscripcion) return;
    await generatePDF(inscripcion);
  };

  return (
    <div>
      <input
        type="number"
        value={inscripcionId || ""}
        onChange={(e) => setInscripcionId(Number(e.target.value))}
        placeholder="Ingrese ID del predio"
      />
      <button
        className="rounded-sm bg-blue-500 text-white p-3 mt-4 ml-5"
        onClick={handleSearch}
      >
        Buscar
      </button>

      {inscripcion && (
        <div className="flex flex-col gap-2 rounded-sm bg-sky-200 p-5 mt-10 w-fit">
          <h2 className="font-bold text-xl">Certificado No Inscrito</h2>
          <p>
            <span className="font-semibold">Nombre del Solicitante:</span>{" "}
            {inscripcion.solicitante}
          </p>

          <button
            className="rounded-sm bg-slate-400 p-3 mt-4"
            onClick={handleGeneratePDF}
          >
            Generar Certificado No inscripción PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificadoNoInscripcionDos;
