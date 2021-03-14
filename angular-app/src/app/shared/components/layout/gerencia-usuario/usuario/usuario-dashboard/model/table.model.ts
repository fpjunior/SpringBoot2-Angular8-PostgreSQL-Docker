import { TableStandard } from "src/app/shared/models/table.model";

export const tableArr: TableStandard[] = [
  { hintName: 'Nome do usuário', field: 'codigoComNome', header: 'NOME', showCol: true },
  { hintName: 'E-mail do usuário', field: 'email', header: 'E-MAIL', showCol: true },
  { hintName: 'Data da última alteração da senha', field: 'dataSenha', header: 'DATA SENHA', showCol: true },
  { hintName: 'Operações Disponíveis', field: 'operation', header: 'OPERAÇÕES', showCol: true }
];