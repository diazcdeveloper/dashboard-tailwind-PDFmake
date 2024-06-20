import { Certificado } from "@/types";

export const fetchData = async (): Promise<Certificado[]> => {
  const response = await fetch("/datos.json");
  return response.json();
};