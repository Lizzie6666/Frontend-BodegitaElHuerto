export interface Quotation{
    id: number;
    idclient: number;
    idconfigquot: number;
    idprop: number;
    period: number;
    frecuency: string;
    gracia: number;
    tax: number;
    taxdeg: number;
    amount: number;
    fee: number;
    initial: boolean;
    final: boolean;
}