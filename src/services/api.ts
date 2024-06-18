import { Radicacion } from "@/types";

export const fetchRadicacionData = async (): Promise<Radicacion[]> => {
  const response = await fetch("/datos.json");
  return response.json();
};