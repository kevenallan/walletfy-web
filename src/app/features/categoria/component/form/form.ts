import { Component, inject, signal } from '@angular/core';

import { CategoriaModel } from '../../models/categoria';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-form',
    imports: [
        Button,
        InputTextModule,
        FormsModule,
        ColorPickerModule,
        ToggleSwitchModule,
        SelectModule,
    ],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form {
    readonly icons = [
        // Geral
        { label: 'Tag', value: 'pi pi-tag' },
        { label: 'Outros', value: 'pi pi-th-large' },
        { label: 'Estrela', value: 'pi pi-star' },

        // Alimentação
        { label: 'Compras', value: 'pi pi-shopping-cart' },
        { label: 'Sacola', value: 'pi pi-shopping-bag' },
        { label: 'Loja', value: 'pi pi-shop' },

        // Transporte
        { label: 'Carro', value: 'pi pi-car' },
        { label: 'Mapa', value: 'pi pi-map' },
        { label: 'Localização', value: 'pi pi-map-marker' },

        // Moradia
        { label: 'Casa', value: 'pi pi-home' },
        { label: 'Prédio', value: 'pi pi-building' },
        { label: 'Chave', value: 'pi pi-key' },
        { label: 'Energia', value: 'pi pi-bolt' },

        // Saúde
        { label: 'Coração', value: 'pi pi-heart' },
        { label: 'Escudo', value: 'pi pi-shield' },
        { label: 'Sol', value: 'pi pi-sun' },

        // Educação
        { label: 'Livro', value: 'pi pi-book' },
        { label: 'Formatura', value: 'pi pi-graduation-cap' },
        { label: 'Lápis', value: 'pi pi-pencil' },
        { label: 'Desktop', value: 'pi pi-desktop' },

        // Lazer
        { label: 'Ingresso', value: 'pi pi-ticket' },
        { label: 'Câmera', value: 'pi pi-camera' },
        { label: 'Vídeo', value: 'pi pi-video' },
        { label: 'Fones', value: 'pi pi-headphones' },

        // Finanças
        { label: 'Carteira', value: 'pi pi-wallet' },
        { label: 'Cartão', value: 'pi pi-credit-card' },
        { label: 'Dinheiro', value: 'pi pi-money-bill' },
        { label: 'Gráfico', value: 'pi pi-chart-bar' },
        { label: 'Porcentagem', value: 'pi pi-percentage' },
        { label: 'Calculadora', value: 'pi pi-calculator' },

        // Trabalho
        { label: 'Maleta', value: 'pi pi-briefcase' },
        { label: 'Usuário', value: 'pi pi-user' },
        { label: 'Equipe', value: 'pi pi-users' },
        { label: 'Arquivo', value: 'pi pi-file' },
        { label: 'Calendário', value: 'pi pi-calendar' },
        { label: 'Telefone', value: 'pi pi-phone' },
        { label: 'Envelope', value: 'pi pi-envelope' },

        { label: 'Código barras', value: 'pi pi-barcode' },
        { label: 'Apple', value: 'pi pi-apple' },
        { label: 'Circulo', value: 'pi pi-circle' },
    ];
    private ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);

    private readonly categoria = (this.config.data?.categoria as CategoriaModel | null) ?? null;

    nome = signal(this.categoria?.nome ?? '');
    icone = signal(
        this.icons.find((i) => i.value === `pi ${this.categoria?.icone}`) ?? this.icons[0],
    );
    cor = signal(this.categoria?.cor ?? '#16a34a');
    ativo = signal(this.categoria?.ativo ?? true);

    salvar() {
        const resultado: CategoriaModel = {
            nome: this.nome(),
            icone: this.icone().value.replace('pi ', ''),
            cor: this.cor(),
            ativo: this.ativo(),
        };
        console.log(resultado);

        this.ref.close(resultado);
    }

    cancelar() {
        this.ref.close();
    }
}
