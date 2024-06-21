import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  children: React.ReactNode;
}


const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="h-full border-r fixed flex flex-col justify-between">
        <Link className="font-extrabold text-2xl p-2 cursor-pointer" href={'/'}>Sidebar</Link>

        <ul className='flex flex-col gap-5 cursor-pointer m-4'>
          <Link className='border-2 rounded-sm text-center' href={'/descargas'}>Descargas</Link>
          <Link className='border-2 rounded-sm text-center' href={'/prueba'}>Prueba</Link>
        </ul>

        <div className="flex gap-2 items-center border-t p-2">
            <div className="border-2 rounded-sm p-2 bg-slate-400">HD</div>
            <div>
                <div className="font-bold">Harold Diaz</div>
                <div className="text-xs">diazcdeveloper@gmail.com</div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar