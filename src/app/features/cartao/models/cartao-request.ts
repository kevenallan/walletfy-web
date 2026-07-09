export interface CartaoRequestDTO {
    contaId: number;
    nome: string;
    limite: number;
    diaFechamento: number;
    diaVencimento: number;
}
