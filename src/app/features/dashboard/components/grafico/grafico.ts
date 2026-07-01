import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-grafico',
    imports: [],
    templateUrl: './grafico.html',
    styleUrl: './grafico.css',
})
export class Grafico implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    dados = input<{ mes: string; total: number }[]>([]);
    titulo = input<string>('aaaa');
    cor = input<string>('#16a34a');

    private chart: Chart | null = null;

    constructor() {
        effect(() => {
            const dados = this.dados();
            const titulo = this.titulo();
            const cor = this.cor();

            if (!this.chart) return;

            this.chart.data.labels = dados.map((d) => d.mes);
            this.chart.data.datasets[0].data = dados.map((d) => d.total);
            this.chart.data.datasets[0].label = titulo;
            this.chart.data.datasets[0].borderColor = cor;
            this.chart.data.datasets[0].backgroundColor = this.criarGradiente(cor);
            this.chart.update();
        });
    }

    ngAfterViewInit() {
        const ctx = this.canvas.nativeElement.getContext('2d')!;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.dados().map((d) => d.mes),
                datasets: [
                    {
                        label: this.titulo(),
                        data: this.dados().map((d) => d.total),
                        borderColor: this.cor(),
                        backgroundColor: this.criarGradiente(this.cor()),
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointRadius: 4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: this.cor(),
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: this.cor(),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart',
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: (context) => this.formatarMoeda(context.parsed.y ?? 0),
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f3f4f6' },
                        ticks: {
                            callback: (value) => this.formatarMoeda(Number(value)),
                            color: '#6b7280',
                            font: { size: 11 },
                        },
                        border: { display: false },
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#6b7280', font: { size: 11 } },
                        border: { display: false },
                    },
                },
            },
        });
    }

    ngOnDestroy() {
        this.chart?.destroy();
    }

    private criarGradiente(cor: string): CanvasGradient {
        const ctx = this.canvas.nativeElement.getContext('2d')!;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, cor + '40');
        gradient.addColorStop(1, cor + '00');
        return gradient;
    }

    private formatarMoeda(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }
}
