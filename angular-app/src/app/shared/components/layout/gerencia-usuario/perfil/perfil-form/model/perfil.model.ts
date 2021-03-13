import { Perfil } from 'src/app/core/model/perfil.model';
import { UserPermission } from 'src/app/core/model/user-permission.model';

import { Usuario } from '../../../usuario/usuario-form/model/usuario-form.model';

export interface AssociarPerfil {
    perfil: Perfil,
    permissoes?: UserPermission[]
}

export interface AssociacaoPerfil {
    usuario: Usuario,
    perfis: Perfil[]
}
