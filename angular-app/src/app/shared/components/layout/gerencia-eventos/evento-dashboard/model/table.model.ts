import { TableStandard } from "src/app/shared/models/table.model";

export const tableArr: TableStandard[] = [
    { hintName: 'Código do evento', field: 'codigo', header: 'CÓDIGO', showCol: true },
    { hintName: 'Descrição evento', field: 'descricao', header: 'DESCRIÇÃO', showCol: true },
    { hintName: 'Tipo do evento', field: 'tipo', header: 'TIPO', showCol: true },
    { hintName: 'Operações Disponíveis', field: 'operation', header: 'OPERAÇÕES', showCol: true },
]