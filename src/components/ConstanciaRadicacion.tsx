"use client";

import React, { useState } from "react";
import { fetchRadicacionData } from "@/services/api";
import { generatePDF } from "@/services/pdf";
import { Radicacion } from "@/types";

const ConstanciaRadicacion: React.FC = () => {
  const [radicacionId, setRadicacionId] = useState<number | null>(null);
  const [radicacion, setRadicacion] = useState<Radicacion | null>(null);

  const handleSearch = async () => {
    const data = await fetchRadicacionData();
    const foundRadicacion = data.find((p) => p.id === radicacionId);
    setRadicacion(foundRadicacion || null);
  };

  const handleGeneratePDF = async () => {
    if (!radicacion) return;
    await generatePDF(radicacion);
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
            onClick={handleGeneratePDF}
          >
            Generar Solicitud PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ConstanciaRadicacion;