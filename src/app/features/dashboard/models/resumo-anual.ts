export interface ResumoAnualResponseDTO {
    mes: string;
    totalReceitas: number;
    totalGastos: number;
    saldo: number;
    categoriaMaisUtilizada: string;
    iconeCategoriaMaisUtilizada: string;
    corCategoriaMaisUtilizada: string;
    quantidadeCategoria: number;
    totalGastoGategoria: number;
    categoriaMaiorGasto: string;
    iconeCategoriaMaiorGasto: string;
    corCategoriaMaiorGasto: string;
    totalCategoriaMaiorGasto: number;
}
