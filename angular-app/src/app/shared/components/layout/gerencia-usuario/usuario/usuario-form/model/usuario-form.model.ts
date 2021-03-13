export interface Usuario {
  assinatura?: AssinaturaIMG;
  codigo?: number;
  codigoPerfil?: number;
  nome: string;
  cpfCnpj?: string;
  email?: string;
  ativo?: boolean;
  gerirUsuario?: string;
  codigoUsuarioAD?: string;
  descricaoNivel?: string;
  descricaoPerfil?: string;
  excluido?: boolean;
  gerirUsuarios?: boolean;
  label?: string;
  motivoBloqueio?: string;
  nivelUsuario?: number;
  nomeResponsavel?: string;
  codigoResponsavelComNome: string;
  permiteDesconectarUsuarios?: boolean;
  senha?: string;
  shutdown?: boolean;
  usuarioResponsavel?: number;
  codigoComNome?: string;
}

interface AssinaturaIMG {
  "asciiStream": {};
  "characterStream": {};
}