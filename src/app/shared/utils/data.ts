export function formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

export function primeiroDiaMes(data: Date = new Date()): string {
    return formatarData(new Date(data.getFullYear(), data.getMonth(), 1));
}

export function ultimoDiaMes(data: Date = new Date()): string {
    return formatarData(new Date(data.getFullYear(), data.getMonth() + 1, 0));
}

export function primeiroDiaMesDate(data: Date = new Date()): Date {
    return new Date(data.getFullYear(), data.getMonth(), 1);
}

export function ultimoDiaMesDate(data: Date = new Date()): Date {
    return new Date(data.getFullYear(), data.getMonth() + 1, 0);
}
