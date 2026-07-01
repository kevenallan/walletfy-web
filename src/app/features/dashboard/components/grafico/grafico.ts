import { AfterViewInit, Component, effect, ElementRef, input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-grafico',
    imports: [],
    templateUrl: './grafico.html',
    styleUrl: './grafico.css',
})
export class Grafico implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    dados = input<{ mes: string; total: number }[]>([]);
    titulo = input<string>('aaaa');
    cor = input<string>('#16a34a');

    private chart: Chart | null = null;

    constructor() {
        effect(() => {
            const dados = this.dados();
            if (this.chart && dados.length > 0) {
                this.chart.data.labels = dados.map((d) => d.mes);
                this.chart.data.datasets[0].data = dados.map((d) => d.total);
                this.chart.update();
            }
        });
    }

    ngAfterViewInit() {
        this.chart = new Chart(this.canvas.nativeElement, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: this.titulo(),
                        data: [],
                        borderColor: this.cor(),
                        backgroundColor: this.cor() + '20',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
            },
        });
    }
}
