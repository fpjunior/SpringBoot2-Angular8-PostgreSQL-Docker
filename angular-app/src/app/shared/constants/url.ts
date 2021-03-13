import { environment } from 'src/environments/environment';

/** URL API */
const URL_API = environment.URL_API;

/** Version API */
const VERSION_API = 'v1';

const COMPLETE_URL = URL_API + VERSION_API;



/** URL login */
export const URL_LOGIN = URL_API + 'login';

/** URLs user */
export const URL_USER = URL_API + VERSION_API + 'usuario/';
export const URL_USER_TO_CPF = URL_USER + 'buscar-por-cpf';
export const URL_UFS_ATUACAO = URL_API + VERSION_API + 'ufs-atuacao';
export const USER_PERMISSION = URL_USER + 'permissao/';
export const URL_RESTORE_CONFIG_CICLO = COMPLETE_URL + '/indicador-conf/motor-servico/parametros-padrao'
export const URL_CICLO = COMPLETE_URL + '/indicador-conf/motor-servico/parametros'
export const URL_SAVE_CICLO = COMPLETE_URL + '/indicador-conf/motor-servico/parametros'

export const URL_PROFILE = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_EVENTS = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_USER_ORIGIN_ACCESS = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_USER_UNIT = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_PERMIT = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_USER_ORIGIN = COMPLETE_URL + 'teste'; //implementar futuramente
export const URL_PROFILE_ASSOCIATES = COMPLETE_URL + 'teste'; //implementar futuramente
export const USER_ASSOCIATES = COMPLETE_URL + 'teste'; //implementar futuramente
