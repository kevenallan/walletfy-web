import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CoresBadgeService {
    private readonly CORES_FORMA_PAGAMENTO: Record<string, string> = {
        PIX: 'bg-verde! text-branco!',
        Débito: 'bg-azul! text-branco!',
        Crédito: 'bg-roxo! text-branco!',
        Dinheiro: 'bg-amarelo! text-branco!',
        Boleto: 'bg-laranja! text-branco!',
        Transferência: 'bg-cinza! text-branco!',
    };

    private readonly CORES_STATUS_GASTO: Record<string, string> = {
        PAGO: 'bg-verde-suave! text-verde!',
        PENDENTE: 'bg-amarelo-claro! text-amarelo!',
        ATRASADO: 'bg-vermelho-claro! text-vermelho!',
        CANCELADO: 'bg-cinza-claro! text-cinza!',
    };

    private readonly CORES_STATUS_RECEITA: Record<string, string> = {
        RECEBIDO: 'bg-verde-suave! text-verde!',
        PENDENTE: 'bg-amarelo-claro! text-amarelo!',
        ATRASADO: 'bg-vermelho-claro! text-vermelho!',
        CANCELADO: 'bg-cinza-claro! text-cinza!',
    };

    getCorFormaPagamento(nome: string): string {
        return this.CORES_FORMA_PAGAMENTO[nome] ?? 'bg-cinza! text-branco!';
    }

    getCorStatusGasto(nome: string): string {
        return this.CORES_STATUS_GASTO[nome] ?? 'bg-cinza-claro! text-cinza!';
    }

    getCorStatusReceita(nome: string): string {
        return this.CORES_STATUS_RECEITA[nome] ?? 'bg-cinza-claro! text-cinza!';
    }
}
