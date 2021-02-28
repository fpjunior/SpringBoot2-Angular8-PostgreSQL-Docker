import * as REGEX from '../constants/regex.constant';

export const formatCPF = (cpf: string): string => {
    let cpfWorked = cpf;
    cpfWorked = cpfWorked.replace(REGEX.NOT_NUMBER, REGEX.EMPTY_VALUE);
    return cpfWorked.replace(REGEX.CPF_REGEX, REGEX.CPF_REPLACE_VALUE);
}

export const formatCNPJ = (cnpj: string): string => {
    let cnpjWorked = cnpj;
    cnpjWorked = cnpjWorked.replace(REGEX.NOT_NUMBER, REGEX.EMPTY_VALUE);
    return cnpjWorked.replace(REGEX.CNPJ_REGEX, REGEX.CNPJ_REPLACE_VALUE);
}

export const formatCEP = (cep: string): string => {
    let cepWorked = cep;
    cepWorked = cepWorked.replace(REGEX.NOT_NUMBER, REGEX.EMPTY_VALUE);
    return cepWorked.replace(REGEX.CEP_REGEX, REGEX.CEP_REPLACE_VALUE);
}

export const formatPercent = (value: number): string => {
    if (!value) return null;
    let strReturn = value.toString().replace(".", ",");
    if (strReturn.length <= 2) {
        return strReturn + ",00";
    } else if (strReturn.length == 3) {
        return strReturn + "0";
    }
    return strReturn;
}

export const formatDate = (date): string => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

export const extractHourDate = (date): string => {
    let d = new Date(date);
    let hour = '' + d.getHours();
    let minute = '' + d.getMinutes();

    if (hour.length < 2)
        hour = '0' + hour;

    if (minute.length < 2)
        minute = '0' + minute;

    return [hour, minute].join(':');
}