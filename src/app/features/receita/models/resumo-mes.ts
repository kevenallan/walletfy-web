export interface ReceitaResumoMesDTO {
    mes: string;
    receitas: number;
    gastos: number;
    saldo: number;
    pendentes: number;
    valorPendente: number;
    principalCategoria: string;
    valorPrincipalCategoria: number;
    percentualPrincipalCategoria: number;
    variacaoReceitas: number;
    variacaoSaldo: number;
}
