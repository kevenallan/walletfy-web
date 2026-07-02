import { Component, computed, input } from '@angular/core';
import { CategoriaResumoResponseDTO } from '../../models/resumo';
import { CardConfig } from '../../models/card-config';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    imports: [NgClass],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class CardInformacoes {
    resumo = input<CategoriaResumoResponseDTO | null>(null);

    cards = computed<CardConfig[]>(() => {
        const r = this.resumo();
        if (!r) return [];

        return [
            {
                titulo: 'Total de categorias',
                valor: `${r.totalCategorias}`,
                descricao: 'Categorias cadastradas no sistema',
                icone: 'pi-tag',
                corFundo: '#3B82F6',
            },
            {
                titulo: 'Categorias ativas',
                valor: `${r.categoriasAtivas}`,
                descricao: 'Categorias em uso no momento',
                icone: 'pi-check-circle',
                corFundo: '#22C55E',
            },
            {
                titulo: 'Mais utilizada',
                valor: r.categoriaMaisUtilizada ?? 'Nenhuma categoria',
                descricao: r.categoriaMaisUtilizada
                    ? `Aparece em ${r.qtdMaisUtilizada} lançamentos`
                    : 'Nenhum lançamento registrado',
                icone: r.iconeMaisUtilizada ?? 'pi-star',
                corFundo: r.corMaisUtilizada ?? '#EAB308',
            },
            {
                titulo: 'Menos utilizada',
                valor: r.categoriaMenosUtilizada ?? 'Nenhuma categoria',
                descricao: r.categoriaMenosUtilizada
                    ? `Aparece em ${r.qtdMenosUtilizada} lançamentos`
                    : 'Nenhum lançamento registrado',
                icone: r.iconeMenosUtilizada ?? 'pi-wallet',
                corFundo: r.corMenosUtilizada ?? '#F97316',
            },
        ];
    });
}
