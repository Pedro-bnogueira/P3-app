// função para formatar os campos de valores monetários(R$ 000.000.000,00)
export function formatMoney(e) {
    const campo = e.target;
    const valor = campo.value.replace(/\D/g, ""); // Remove tudo o que não é dígito
    let novoValor = "";
    // Adiciona o prefixo "R$ "
    novoValor += "R$ ";
    // Verifica se há parte inteira
    if (valor.length > 2) {
      const parteInteira = valor.slice(0, -2);
      const parteDecimal = valor.slice(-2);
      // Formatação para a parte inteira
      novoValor += parteInteira.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "," + parteDecimal;
    } else {
      novoValor += valor;
    }
    campo.value = novoValor;
  }