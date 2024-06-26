"use client";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  Content,
  ContentImage,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Prueba: React.FC = () => {

  const generatePDF = () => {

    const docDefinition: TDocumentDefinitions = {
      content: [
        {text: 'Pueba de descarga', bold: true, fontSize: 30}
      ],
    };

    pdfMake.createPdf(docDefinition).download(`Numero de Solicitud.pdf`);
  };

  return (
    <div>
      <button
        className="rounded-sm bg-slate-400 p-3 mt-4"
        onClick={generatePDF}
      >
        Descarga
      </button>
    </div>
  );
};

export default Prueba;
