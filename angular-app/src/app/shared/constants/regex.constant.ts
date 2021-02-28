export const CPF_REGEX: RegExp = /(\d{3})(\d{3})(\d{3})(\d{2})/g;
export const CPF_REPLACE_VALUE: string = "$1.$2.$3-$4";

export const CNPJ_REGEX: RegExp = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g;
export const CNPJ_REPLACE_VALUE: string = "\$1.\$2.\$3\/\$4\-\$5";

export const CEP_REGEX: RegExp = /(\d{5})(\d{3})/g;
export const CEP_REPLACE_VALUE: string = "\$1\-\$2";

export const EMPTY_VALUE: string = "";

export const VALIDATE_ROUTE_REGEX: RegExp = /[|#&;$%@"<>()+,]/g;

export const DAY_CHECK: RegExp = /^\d{2}$/;
export const DAY_CHECKED: RegExp = /^(\d{2})/;
export const DAY_REPLACE: string = '$1/';

export const MONTH_CHECK: RegExp = /^\d{2}\/\d{2}$/;
export const MONTH_CHECKED: RegExp = /^(\d{2})\/(\d{2})$/;
export const MONTH_REPLACE: string = '$1/$2/';

export const NOT_NUMBER: RegExp = /[^\d]/g;