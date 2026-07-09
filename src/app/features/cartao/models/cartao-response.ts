import { Banco } from '../../banco/models/banco';

export interface CartaoResponseDTO {
    id: number;
    nome: string;
    limite: number;
    diaFechamento: number;
    diaVencimento: number;
    faturaAtual: number;
    limiteDisponivel: number;
    percentualUsado: number;
    banco: Banco | null;
}
