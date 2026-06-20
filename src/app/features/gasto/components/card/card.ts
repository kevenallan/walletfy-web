import { Component, input } from '@angular/core';
import { NgClass, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ResumoMesDTO } from '../../models/resumo-mes';
import { CardExibicaoDTO } from '../../models/card-exibicao';

@Component({
    selector: 'app-card',
    imports: [CarouselModule, CurrencyPipe, NgClass, DatePipe, TitleCasePipe],
    templateUrl: './card.html',
})
export class Card {
    resumoMeses = input<ResumoMesDTO[]>([]);

    responsiveOptions = [
        { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
        { breakpoint: '768px', numVisible: 1, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];

    private readonly CARDS_CONFIG = [
        {
            titulo: 'Receita',
            campo: 'receita' as keyof ResumoMesDTO,
            campVariacao: 'variacaoReceita' as keyof ResumoMesDTO,
            icone: 'pi pi-chart-bar',
            corIcone: 'text-azul-escuro',
            background: 'bg-azul-claro',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Despesas',
            campo: 'despesas' as keyof ResumoMesDTO,
            campVariacao: 'variacaoDespesas' as keyof ResumoMesDTO,
            icone: 'pi pi-arrow-down',
            corIcone: 'text-vermelho',
            background: 'bg-vermelho-claro',
            variacaoPositivaEBoa: false,
        },
        {
            titulo: 'Saldo Atual',
            campo: 'saldo' as keyof ResumoMesDTO,
            campVariacao: 'variacaoSaldo' as keyof ResumoMesDTO,
            icone: 'pi pi-wallet',
            corIcone: 'text-verde-escuro',
            background: 'bg-verde-claro',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Pendentes',
            campo: 'pendentes' as keyof ResumoMesDTO,
            campVariacao: null,
            icone: 'pi pi-calendar-clock',
            corIcone: 'text-amarelo-escuro',
            background: 'bg-amarelo-claro',
            variacaoPositivaEBoa: false,
        },
    ];

    getCardsDoMes(resumo: ResumoMesDTO): CardExibicaoDTO[] {
        return this.CARDS_CONFIG.map((config) => {
            const valor = resumo[config.campo] as number;
            const variacao = config.campVariacao ? (resumo[config.campVariacao] as number) : null;

            if (config.titulo === 'Pendentes') {
                return {
                    titulo: config.titulo,
                    valor,
                    icone: config.icone,
                    corIcone: config.corIcone,
                    background: config.background,
                    corVariacao: valor === 0 ? 'text-verde' : 'text-amarelo-escuro',
                    iconeVariacao: 'pi pi-calendar-clock',
                    descricao: `${valor} conta${valor !== 1 ? 's' : ''} a vencer`,
                };
            }

            const variacaoPositiva = (variacao ?? 0) >= 0;
            const eBoa = config.variacaoPositivaEBoa ? variacaoPositiva : !variacaoPositiva;

            return {
                titulo: config.titulo,
                valor,
                icone: config.icone,
                corIcone: config.corIcone,
                background: config.background,
                corVariacao: eBoa ? 'text-verde' : 'text-vermelho',
                iconeVariacao: variacaoPositiva ? 'pi pi-chevron-up' : 'pi pi-chevron-down',
                descricao: `${Math.abs(variacao ?? 0).toFixed(1)}% vs mês anterior`,
            };
        });
    }
}
