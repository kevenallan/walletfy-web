import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { CardExibicaoReceitaDTO } from '../../models/card-exibicao';
import { ReceitaResumoMesDTO } from '../../models/resumo-mes';

@Component({
    selector: 'app-receita-card',
    imports: [Carousel, DatePipe, TitleCasePipe, NgClass],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    resumoMeses = input<ReceitaResumoMesDTO[]>([]);

    responsiveOptions = [
        { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
        { breakpoint: '768px', numVisible: 1, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];

    private readonly CARDS_CONFIG = [
        {
            titulo: 'Total de Receita',
            campo: 'receitas' as keyof ReceitaResumoMesDTO,
            campoVariacao: 'variacaoReceitas' as keyof ReceitaResumoMesDTO,
            icone: 'pi pi-wallet',
            corIcone: 'text-verde-escuro',
            background: 'bg-verde-claro',
            tipo: 'receita',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Principal Fonte de Renda',
            campo: 'principalCategoria' as keyof ReceitaResumoMesDTO,
            campoVariacao: 'percentualPrincipalCategoria' as keyof ReceitaResumoMesDTO,
            icone: 'pi pi-star',
            corIcone: 'text-azul-escuro',
            background: 'bg-azul-claro',
            tipo: 'categoria',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Saldo Atual',
            campo: 'saldo' as keyof ReceitaResumoMesDTO,
            campoVariacao: 'variacaoSaldo' as keyof ReceitaResumoMesDTO,
            icone: 'pi pi-dollar',
            corIcone: 'text-verde-escuro',
            background: 'bg-verde-claro',
            tipo: 'saldo',
            variacaoPositivaEBoa: true,
        },
        {
            titulo: 'Pendentes',
            campo: 'valorPendente' as keyof ReceitaResumoMesDTO,
            campoVariacao: 'pendentes' as keyof ReceitaResumoMesDTO,
            icone: 'pi pi-calendar-clock',
            corIcone: 'text-amarelo-escuro',
            background: 'bg-amarelo-claro',
            tipo: 'pendente',
            variacaoPositivaEBoa: false,
        },
    ];

    getCardsDoMes(resumo: ReceitaResumoMesDTO): CardExibicaoReceitaDTO[] {
        return this.CARDS_CONFIG.map((config) => {
            const valor = resumo[config.campo];
            const variacao = resumo[config.campoVariacao] as number;

            if (config.tipo === 'categoria') {
                return {
                    titulo: config.titulo,
                    valor: valor as string,
                    icone: config.icone,
                    corIcone: config.corIcone,
                    background: config.background,
                    corVariacao: 'text-cinza',
                    iconeVariacao: 'pi pi-chart-pie',
                    descricao: `${valor} representa ${variacao}% da sua renda`,
                };
            }

            if (config.tipo === 'pendente') {
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
                    descricao: `${variacao} receita${variacao !== 1 ? 's' : ''} pendente${variacao !== 1 ? 's' : ''}`,
                };
            }

            const variacaoPositiva = (variacao ?? 0) >= 0;
            const eBoa = config.variacaoPositivaEBoa ? variacaoPositiva : !variacaoPositiva;

            const corVariacao =
                config.tipo === 'saldo'
                    ? (variacao as number) >= 0
                        ? 'text-verde'
                        : 'text-vermelho'
                    : eBoa
                      ? 'text-verde'
                      : 'text-vermelho';

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
                corVariacao,
                iconeVariacao: variacaoPositiva ? 'pi pi-chevron-up' : 'pi pi-chevron-down',
                descricao: `${valorFormatado} ${variacaoPositiva ? 'a mais ' : 'a menos'} que o mês anterior `,
            };
        });
    }
}
