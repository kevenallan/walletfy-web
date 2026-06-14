import { CategoriaDTO } from '../../categoria/models/categoria';
import { FormaPagamentoDTO } from './forma-pagamento';
import { StatusGastoDTO } from './status-gasto';

export interface GastoDTO {
    id: number;
    categoria: CategoriaDTO;
    formaPagamento: FormaPagamentoDTO;
    status: StatusGastoDTO;
    descricao: string;
    valor: number;
    dataGasto: Date;
    dataVencimento: Date;
}
