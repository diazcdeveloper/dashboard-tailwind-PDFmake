import ConstanciaRadicacion from "@/components/ConstanciaRadicacion"

function page() {
  return (
    <div>
        Ingresa el <span className="text-xl font-extrabold">ID 1</span> para generar el PDF de ejemplo
        <ConstanciaRadicacion/>
    </div>
  )
}

export default page