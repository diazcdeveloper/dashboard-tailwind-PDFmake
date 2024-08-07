import CalidadProducto from '@/components/CalidadProducto';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla de Solicitudes</h1>
      <CalidadProducto />
    </div>
  );
};

export default HomePage;