export interface Evento {
  codigo?: number,
  descricao: string,
  tipo,
  baseIncidencia?,
  icms?: string,
  icmsSt?: string,
  pis?: string,
  cofins?: string,
  ipi?: string,
  impostoImportacao?: string,
}
