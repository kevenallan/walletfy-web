import { CategoriaDTO } from '../../categoria/models/categoria';
import { ContaResponseDTO } from '../../conta/models/conta-response';
import { FormaPagamentoDTO } from '../../gasto/models/forma-pagamento';
import { StatusReceitaDTO } from './status-receita';

export interface ReceitaResponseDTO {
    id: number;
    categoria: CategoriaDTO;
    formaPagamento: FormaPagamentoDTO;
    status: StatusReceitaDTO;
    conta: ContaResponseDTO;
    descricao: string;
    valor: number;
    dataReceita: string;
    // recorrente:boolean,
    ativo: boolean;
}
