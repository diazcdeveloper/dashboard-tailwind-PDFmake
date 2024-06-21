import CertificadoInscripcion from "@/components/CertificadoInscripcion"
import ConstanciaRadicacion from "@/components/ConstanciaRadicacion"
import CertificadoNoInscripcion from "@/components/CertificadoNoInscripcion";
import CertificadoPlanoPredial from "@/components/CertificadoPlanoPredial";

function page() {
  return (
    <div className="flex gap-20 flex-col h-full w-full p-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-4">CONSTANCIA DE RADICACIÓN</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <ConstanciaRadicacion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4">CERTIFICADO INSCRIPCIÓN CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoInscripcion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4">CERTIFICADO INSCRIPCIÓN CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoNoInscripcion/>
      </div>

      <div>
        <h1 className="font-extrabold text-2xl mb-4">CERTIFICADO PLANO PREDIAL CATASTRAL</h1>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <CertificadoPlanoPredial/>
      </div>
      
    </div>
  );
};

export default page