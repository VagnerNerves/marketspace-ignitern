export function numberCleanTel(tel: string) {
  try {
    return tel.replace(/\D/g, '').slice(0, 11)
  } catch {
    return ''
  }
}

export function formattedTel(tel: string) {
  const numberTelClean = numberCleanTel(tel)

  let numberTelFormatted = ''

  const boIsNumber10 = numberTelClean.length === 10

  if (numberTelClean.length > 0) {
    numberTelFormatted += `(${numberTelClean.slice(0, 2)}`

    if (numberTelClean.length > 2) {
      numberTelFormatted += `) ${numberTelClean.slice(2, boIsNumber10 ? 6 : 7)}`
    }

    if (numberTelClean.length > 7) {
      numberTelFormatted += `-${numberTelClean.slice(boIsNumber10 ? 6 : 7, 11)}`
    }
  }

  return numberTelFormatted
}

export function validateTel(tel: string) {
  const numberTelClean = numberCleanTel(tel)

  return numberTelClean.length === 10 || numberTelClean.length === 11
}
