export function formattedNumberForRealBRL(number: number) {
  const numberFormatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number)

  return numberFormatted
}

export function inputOnChangeUnformattedTextToNumber(number: string) {
  if (number.trim() === '') {
    return undefined
  }

  const onlyNumber = '0000' + number.replace(/\D/g, '').slice(0, 10)

  const numberFormatted = onlyNumber.slice(0, -2) + '.' + onlyNumber.slice(-2)

  return parseFloat(numberFormatted)
}
