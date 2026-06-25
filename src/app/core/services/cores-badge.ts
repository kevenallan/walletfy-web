import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CoresBadgeService {
    private readonly CORES_FORMA_PAGAMENTO: Record<string, string> = {
        PIX: 'bg-verde! text-white!',
        Débito: 'bg-azul! text-white!',
        Crédito: 'bg-roxo! text-white!',
        Dinheiro: 'bg-amarelo! text-white!',
        Boleto: 'bg-laranja! text-white!',
        Transferência: 'bg-cinza! text-white!',
    };

    private readonly CORES_STATUS_GASTO: Record<string, string> = {
        PAGO: 'bg-verde-claro! text-verde!',
        PENDENTE: 'bg-amarelo-claro! text-amarelo!',
        ATRASADO: 'bg-vermelho-claro! text-vermelho!',
        CANCELADO: 'bg-cinza-claro! text-cinza!',
    };

    private readonly CORES_STATUS_RECEITA: Record<string, string> = {
        RECEBIDO: 'bg-verde-claro! text-verde!',
        PENDENTE: 'bg-amarelo-claro! text-amarelo!',
        ATRASADO: 'bg-vermelho-claro! text-vermelho!',
        CANCELADO: 'bg-cinza-claro! text-cinza!',
    };

    getCorFormaPagamento(nome: string): string {
        return this.CORES_FORMA_PAGAMENTO[nome] ?? 'bg-cinza! text-white!';
    }

    getCorStatusGasto(nome: string): string {
        return this.CORES_STATUS_GASTO[nome] ?? 'bg-cinza-claro! text-cinza!';
    }

    getCorStatusReceita(nome: string): string {
        return this.CORES_STATUS_RECEITA[nome] ?? 'bg-cinza-claro! text-cinza!';
    }
}
