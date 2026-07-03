import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardExibicaoDTO } from '../../models/card-exibicao';
import { ResumoMesDTO } from '../../models/resumo-mes';

@Component({
    selector: 'app-card',
    imports: [CarouselModule, NgClass, DatePipe, TitleCasePipe],
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
            titulo: 'Total de Receita',
            campo: 'receita' as keyof ResumoMesDTO,
            campVariacao: 'variacaoReceita' as keyof ResumoMesDTO,
            icone: 'pi pi-chart-bar',
            corIcone: 'text-azul-escuro',
            background: 'bg-azul-suave',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Despesas',
            campo: 'despesas' as keyof ResumoMesDTO,
            campVariacao: 'variacaoDespesas' as keyof ResumoMesDTO,
            icone: 'pi pi-arrow-down',
            corIcone: 'text-vermelho',
            background: 'bg-vermelho-suave',
            variacaoPositivaEBoa: false,
        },
        {
            titulo: 'Saldo Atual',
            campo: 'saldo' as keyof ResumoMesDTO,
            campVariacao: 'variacaoSaldo' as keyof ResumoMesDTO,
            icone: 'pi pi-wallet',
            corIcone: 'text-verde',
            background: 'bg-verde-suave',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Pendentes',
            campo: 'valorPendente' as keyof ResumoMesDTO,
            campVariacao: 'pendentes' as keyof ResumoMesDTO,
            icone: 'pi pi-calendar-clock',
            corIcone: 'text-amarelo-escuro',
            background: 'bg-amarelo-claro',
            variacaoPositivaEBoa: false,
        },
    ];

    getCardsDoMes(resumo: ResumoMesDTO): CardExibicaoDTO[] {
        return this.CARDS_CONFIG.map((config) => {
            const valor = resumo[config.campo] as number;
            const variacao = resumo[config.campVariacao] as number;

            if (config.titulo === 'Pendentes') {
                return {
                    titulo: config.titulo,
                    valor: new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(valor as number),
                    icone: config.icone,
                    corIcone: config.corIcone,
                    background: config.background,
                    corVariacao: valor === 0 ? 'text-verde' : 'text-amarelo-escuro',
                    iconeVariacao: 'pi pi-calendar-clock',
                    descricao: `${variacao} conta${variacao !== 1 ? 's' : ''} a vencer`,
                };
            }

            const variacaoPositiva = (variacao ?? 0) >= 0;
            const eBoa = config.variacaoPositivaEBoa ? variacaoPositiva : !variacaoPositiva;

            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(variacao);

            return {
                titulo: config.titulo,
                valor: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(valor as number),
                icone: config.icone,
                corIcone: config.corIcone,
                background: config.background,
                corVariacao: eBoa ? 'text-verde' : 'text-vermelho',
                iconeVariacao: variacaoPositiva ? 'pi pi-chevron-up' : 'pi pi-chevron-down',
                descricao: `${valorFormatado} ${variacaoPositiva ? 'a mais ' : 'a menos'} que o mês anterior `,
            };
        });
    }
}
