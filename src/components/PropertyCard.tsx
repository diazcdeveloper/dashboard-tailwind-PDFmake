'use client'

import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Cargar las fuentes necesarias para pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Definir la interfaz para el tipo Property
interface Property {
  id: number;
  ciudad: string;
  barrio: string;
  direccion: string;
  metrosCuadrados: number;
}

const PropertyCard: React.FC = () => {
  // Estado para almacenar el ID del predio a buscar
  const [propertyId, setPropertyId] = useState<number | null>(null);
  // Estado para almacenar los datos del predio encontrado
  const [property, setProperty] = useState<Property | null>(null);

  // Función para manejar la búsqueda del predio
  const handleSearch = async () => {
    const response = await fetch('/predios.json');
    const data: Property[] = await response.json();
    // Buscar el predio por ID
    const foundProperty = data.find(p => p.id === propertyId);
    setProperty(foundProperty || null);
  };

  // Función para generar el PDF
  const generatePDF = () => {
    if (!property) return;

    // Definición del documento PDF
    const docDefinition = {
      content: [
        `El predio se encuentra en la ciudad de ${property.ciudad}, en el barrio ${property.barrio}, su dirección es ${property.direccion} y tiene ${property.metrosCuadrados} m2.`
      ]
    };

    // Crear y descargar el PDF
    pdfMake.createPdf(docDefinition).download(`Predio_${property.id}.pdf`);
  };

  return (
    <div>
      {/* Input para ingresar el ID del predio */}
      <input
        type="number"
        value={propertyId || ''}
        onChange={e => setPropertyId(Number(e.target.value))}
        placeholder="Ingrese ID del predio"
      />
      <button className='rounded-sm bg-blue-500 text-white p-3 mt-4 ml-5' onClick={handleSearch}>Buscar</button>

      {/* Mostrar la información del predio si se encuentra */}
      {property && (
        <div className="property-card flex flex-col gap-2 rounded-sm bg-sky-200 p-5  mt-10">
          <h2 className='font-bold text-xl'>Información del Predio</h2>
          <p> <span className='font-semibold'>Ciudad:</span> {property.ciudad}</p>
          <p><span className='font-semibold'>Barrio:</span> {property.barrio}</p>
          <p><span className='font-semibold'>Dirección:</span> {property.direccion}</p>
          <p><span className='font-semibold'>Metros Cuadrados:</span> {property.metrosCuadrados}</p>
          <button className='rounded-sm bg-slate-400 p-3 mt-4' onClick={generatePDF}>Descargar PDF</button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;