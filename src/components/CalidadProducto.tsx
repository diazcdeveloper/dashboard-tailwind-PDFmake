"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { useTable, Column } from 'react-table';

interface DataProductos {
  referencia: string;
  numero_de_solicitud: string;
  producto_solicitado: string;
  sub_tipo: string;
  fecha: string;
  destino_a: string;
  estado: string;
  pdf_generado: string;
  cambiar_estado: string;
}

const CalidadProducto: React.FC = () => {
  const [data, setData] = useState<DataProductos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/dataproductos.json');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const columns: Column<DataProductos>[] = useMemo(
    () => [
      { Header: 'Referencia', accessor: 'referencia' },
      { Header: 'Número de Solicitud', accessor: 'numero_de_solicitud' },
      { Header: 'Producto Solicitado', accessor: 'producto_solicitado' },
      { Header: 'Sub Tipo', accessor: 'sub_tipo' },
      { Header: 'Fecha', accessor: 'fecha' },
      { Header: 'Destino A', accessor: 'destino_a' },
      { Header: 'Estado', accessor: 'estado' },
      { Header: 'PDF Generado', accessor: 'pdf_generado' },
      { Header: 'Cambiar Estado', accessor: 'cambiar_estado' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="even:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-3 border-b border-gray-200 text-sm text-gray-700">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalidadProducto;