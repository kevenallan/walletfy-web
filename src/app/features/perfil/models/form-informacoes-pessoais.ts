export interface FormInformacoesPessoaisDTO {
    nome: string;
    email: string;
    telefone?: string;
    dataNascimento?: Date;
    foto?: File;
}
