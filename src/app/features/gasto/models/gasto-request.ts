export interface GastoRequestDTO {
    categoriaId: number;
    formaPagamentoId: number;
    statusId: number;
    descricao: string;
    valor: number;
    dataGasto: Date;
    dataVencimento: Date | null;
}
