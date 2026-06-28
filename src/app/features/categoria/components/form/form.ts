import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';

import { CategoriaDTO } from '../../models/categoria';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ColorPicker, ColorPickerModule } from 'primeng/colorpicker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TipoCategoria } from '../../../../core/enum/tipo-categoria';

@Component({
    selector: 'app-form',
    imports: [
        Button,
        InputTextModule,
        FormsModule,
        ColorPickerModule,
        ToggleSwitchModule,
        SelectModule,
        RadioButtonModule,
    ],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
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

    coresPadrao = ['#dc2626', '#f59e0b', '#16a34a', '#0ea5e9', '#7c3aed'];
    corSelecionada = signal('#dc2626');
    exibirColorPicker = false;

    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig);

    readonly categoria = (this._config.data?.categoria as CategoriaDTO | null) ?? null;

    nome = signal(this.categoria?.nome ?? '');
    icone = signal(
        this.icons.find((i) => i.value === `pi ${this.categoria?.icone}`) ?? this.icons[0],
    );
    cor = signal(this.categoria?.cor ?? '#ff00d5');
    ativo = signal(this.categoria?.ativo ?? true);
    tipo = signal(this.categoria?.tipo ?? 'DESPESA');

    @ViewChild('cp') colorPickerTag!: ColorPicker;

    ngOnInit(): void {
        if (this.categoria) {
            this.setarCorEditar(this.categoria);
        }
    }

    salvar() {
        const resultado: CategoriaDTO = {
            id: this.categoria?.id,
            nome: this.nome(),
            icone: this.icone().value.replace('pi ', ''),
            cor: this.getCorSelecionada(),
            ativo: this.ativo(),
            tipo: this.tipo() as TipoCategoria,
        };

        this._ref.close(resultado);
    }

    cancelar() {
        this._ref.close();
    }
    selecionarCor(cor: string) {
        this.corSelecionada.set(cor);
        this.exibirColorPicker = false;
    }

    exibicaoColorPicker() {
        this.exibirColorPicker = !this.exibirColorPicker;
        setTimeout(() => this.colorPickerTag.show(), 0);
        this.corSelecionada.set('');
    }

    getCorSelecionada() {
        return this.exibirColorPicker ? this.cor() : this.corSelecionada();
    }

    setarCorEditar(categoriaEditar: CategoriaDTO) {
        if (this.coresPadrao.includes(categoriaEditar?.cor)) {
            this.corSelecionada.set(categoriaEditar.cor);
        } else {
            this.exibirColorPicker = true;
            this.corSelecionada.set('');
        }
    }
}
