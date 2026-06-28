import { TipoCategoria } from '../../../core/enum/tipo-categoria';

export interface CategoriaDTO {
    id?: number;
    nome: string;
    icone: string;
    cor: string;
    ativo: boolean;
    tipo: TipoCategoria;
}
