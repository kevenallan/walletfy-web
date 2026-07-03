export interface FormDTO {
    nome: string;
    email: string;
    senhaAntiga: string;
    senhaNova: string;
    telefone?: string;
    dataNascimento?: Date;
    foto?: string;
}
