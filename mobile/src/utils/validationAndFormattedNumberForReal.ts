export function formattedNumberForRealBRL(number: number) {
  const numberFormatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number)

  return numberFormatted
}
