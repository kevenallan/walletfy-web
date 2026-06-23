import { CategoriaDTO } from '../../categoria/models/categoria';
import { FormaPagamentoDTO } from '../../gasto/models/forma-pagamento';
import { StatusReceitaDTO } from './status-receita';

export interface ReceitaResponseDTO {
    id: number;
    categoria: CategoriaDTO;
    formaPagamento: FormaPagamentoDTO;
    status: StatusReceitaDTO;
    descricao: string;
    valor: number;
    dataReceita: Date;
    // recorrente:boolean,
    ativo: boolean;
}
