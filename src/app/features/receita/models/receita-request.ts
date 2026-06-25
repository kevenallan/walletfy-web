export interface ReceitaRequestDTO {
    id?: number;
    categoriaId: number;
    formaPagamentoId: number;
    statusId: number;
    descricao: string;
    valor: number;
    dataReceita: string;
}
