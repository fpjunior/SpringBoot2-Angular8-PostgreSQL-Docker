import { DropdownStandard } from "src/app/shared/models/dropdown.model"

export const baseIncidenciaArr: DropdownStandard[] = [
  { value: 1, description: 'PREÇO DE LISTA', viewValue: '1 - PREÇO DE LISTA' },
  { value: 2, description: 'PREÇO DA NF', viewValue: '2 - PREÇO DA NF' }
]

export const tiposArr: DropdownStandard[] = [
  { value: 1, description: 'CRÉDITOS NA COMPRA', viewValue: '1 - CRÉDITOS NA COMPRA' },
  { value: 2, description: 'GASTOS NA COMPRA', viewValue: '2 - GASTOS NA COMPRA' },
  { value: 3, description: 'MARGEM PRETENDIDA', viewValue: '3 - MARGEM PRETENDIDA' },
  { value: 4, description: 'DESPESAS VARIÁVEIS', viewValue: '4 - DESPESAS VARIÁVEIS' },
  { value: 5, description: 'DESPESAS FIXAS', viewValue: '5 - DESPESAS FIXAS' },
  { value: 6, description: 'DESPESAS FINANCEIRAS', viewValue: '6 - DESPESAS FINANCEIRAS' },
  { value: 7, description: 'OUTRAS DESPESAS INDIRETAS', viewValue: '7 - OUTRAS DESPESAS INDIRETAS' },
  { value: 8, description: 'REDUTOR DE MARKUP', viewValue: '8 - REDUTOR DE MARKUP' }
]
