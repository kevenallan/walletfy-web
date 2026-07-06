import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TIPO_CONTA_LABEL, TipoConta } from '../../../../core/enum/tipo-conta';
import { Banco } from '../../../banco/models/banco';
import { BancoService } from '../../../banco/services/banco';
import { ContaRequestDTO } from '../../models/conta-request';
import { ContaResponseDTO } from '../../models/conta-response';

@Component({
    selector: 'app-form',
    imports: [Button, FormsModule, InputTextModule, Select, InputNumberModule],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    readonly possuiBanco = [TipoConta.CORRENTE, TipoConta.POUPANCA];
    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig);
    readonly conta = (this._config.data?.conta as ContaResponseDTO | null) ?? null;
    readonly isEdicao = computed(() => this.conta !== null);
    nome = signal(this.conta?.nome ?? '');
    ativo = signal(this.conta?.ativo ?? '');
    banco = signal<Banco>((this.conta?.banco as Banco) ?? null);
    bancos = signal<Banco[]>([]);
    tipoContaOptions = Object.values(TipoConta).map((tipo) => ({
        label: TIPO_CONTA_LABEL[tipo],
        value: tipo,
    }));
    saldoInicial = signal<number | null>(null);
    tipo = signal<TipoConta | null>(this.conta?.tipo ?? null);

    private _bancoService = inject(BancoService);

    exibirSelectBanco = computed(() => {
        const tipo = this.tipo();
        return !!tipo && this.possuiBanco.includes(tipo);
    });

    ngOnInit(): void {
        this.getBancos();
    }

    getBancos() {
        this._bancoService.listar().subscribe({
            next: (response) => {
                this.bancos.set(response);
            },
        });
    }
    salvar() {
        const resultado: ContaRequestDTO = {
            nome: this.nome(),
            tipo: this.tipo() as TipoConta,
            saldoInicial: this.saldoInicial() || 0,
            bancoId: this.exibirSelectBanco() && this.banco() ? this.banco().id : undefined,
        };
        if (this.isEdicao()) {
            resultado.id = this.conta?.id;
        }

        this._ref.close(resultado);
    }

    cancelar() {
        this._ref.close();
    }
}
