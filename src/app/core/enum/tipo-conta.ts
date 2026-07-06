export enum TipoConta {
    CORRENTE = 'CORRENTE',
    POUPANCA = 'POUPANCA',
    CARTEIRA = 'CARTEIRA',
    VALE_REFEICAO = 'VALE_REFEICAO',
    VALE_ALIMENTACAO = 'VALE_ALIMENTACAO',
}

export const TIPO_CONTA_LABEL: Record<TipoConta, string> = {
    [TipoConta.CORRENTE]: 'Corrente',
    [TipoConta.POUPANCA]: 'Poupança',
    [TipoConta.CARTEIRA]: 'Carteira',
    [TipoConta.VALE_REFEICAO]: 'Vale Refeição',
    [TipoConta.VALE_ALIMENTACAO]: 'Vale Alimentação',
};
