import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContaResponseDTO } from '../../models/conta-response';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { TIPO_CONTA_LABEL, TipoConta } from '../../../../core/enum/tipo-conta';
import { InputNumberModule } from 'primeng/inputnumber';
import { BancoService } from '../../../banco/services/banco';
import { Banco } from '../../../banco/models/banco';
import { ContaRequestDTO } from '../../models/conta-request';

@Component({
    selector: 'app-form',
    imports: [Button, FormsModule, InputTextModule, ToggleSwitch, Select, InputNumberModule],
    templateUrl: './form.html',
    styleUrl: './form.css',
})
export class Form implements OnInit {
    readonly possuiBanco = [TipoConta.CORRENTE, TipoConta.POUPANCA, null];
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
            bancoId: this.banco() ? this.banco().id : undefined,
        };
        console.log(resultado);

        this._ref.close(resultado);
    }

    cancelar() {
        this._ref.close();
    }
}
