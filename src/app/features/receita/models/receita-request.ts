export interface ReceitaRequestDTO {
    id?: number;
    categoriaId: number;
    formaPagamentoId: number;
    statusId: number;
    contaId?: number;
    descricao: string;
    valor: number;
    dataReceita: string;
}
