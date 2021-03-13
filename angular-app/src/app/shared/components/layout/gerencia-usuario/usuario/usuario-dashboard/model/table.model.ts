import { TableStandard } from "src/app/shared/models/table.model";

export const tableArr: TableStandard[] = [
  { hintName: 'Código do usuário', field: 'codigo', header: 'USUÁRIO', showCol: true },
  { hintName: 'Nome do usuário', field: 'nome', header: 'NOME', showCol: true },
  { hintName: 'CPF do usuário', field: 'cpfCnpj', header: 'CPF', showCol: true },
  { hintName: 'E-mail do usuário', field: 'email', header: 'E-MAIL', showCol: true },
  { hintName: 'Indicação do status do usuário: Ativo ou Inativo', field: 'ativo', header: 'ATIVO', showCol: true },
  { hintName: 'Nível do usuário', field: 'descricaoNivel', header: 'NÍVEL', showCol: true },
  { hintName: 'Superior imediato ao qual o usuário está subordinado', field: 'usuarioResponsavel', header: 'RESPONSÁVEL', showCol: true },
  { hintName: 'Operações Disponíveis', field: 'operation', header: 'OPERAÇÕES', showCol: true }
];