import React from 'react';
import PropertyCard from '@/components/PropertyCard';

const page: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-xl mb-5'>Buscador de Predios</h1>
      <PropertyCard />
    </div>
  );
};

export default page;