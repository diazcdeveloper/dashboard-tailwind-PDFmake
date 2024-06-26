
"use client";

import React, { useState } from "react";
import { fetchData } from "@/services/api";
import { generatePDF } from "@/services/pdfCertificadoAvaluoCatastral";
import { Certificado } from "@/types";

const CertificadoAvaluoCatastral: React.FC = () => {
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
          <h2 className="font-bold text-xl">Certificado Avalúo Catastral</h2>
          <p>
            <span className="font-semibold">Numero del Solicitante:</span>{" "}
            {inscripcion.id}
          </p>

          <button
            className="rounded-sm bg-slate-400 p-3 mt-4"
            onClick={handleGeneratePDF}
          >
            Generar Avalúo Catastral PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificadoAvaluoCatastral;
