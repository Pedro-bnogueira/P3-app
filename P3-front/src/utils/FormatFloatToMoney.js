// Converte um valor float em uma representação monetária no formato "R$ 000.000,00"
export function formatFloatToMoney(value) {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
        return "R$ 0.00";
    }

    const formattedValue = floatValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return formattedValue;
}