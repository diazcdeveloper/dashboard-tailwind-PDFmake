import CertificadoInscripcion from "@/components/CertificadoInscripcion"
import ConstanciaRadicacion from "@/components/ConstanciaRadicacion"
import CertificadoNoInscripcion from "@/components/CertificadoNoInscripcion";
import CertificadoPlanoPredial from "@/components/CertificadoPlanoPredial";
import CertificadoAvaluoCatastral from "@/components/CertificadoAvaluoCatastral";
import ConstanciaRadicacionDos from "@/components/ConstanciaRadicacionDos";

function page() {
  return (
    <div className="flex gap-20 flex-col h-full w-full p-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-4">CONSTANCIA DE RADICACIÓN</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <ConstanciaRadicacion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4">CONSTANCIA DE RADICACIÓN DOS</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <ConstanciaRadicacionDos/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4 border-t">CERTIFICADO INSCRIPCIÓN CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoInscripcion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4 border-t">CERTIFICADO NO INSCRIPCIÓN CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoNoInscripcion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4 border-t">CERTIFICADO PLANO PREDIAL CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoPlanoPredial/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4 border-t">CERTIFICADO AVALÚO CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoAvaluoCatastral/>
      </div>
      
    </div>
  );
};

export default page