export type PaymentMethodDTO = {
  key: string
  name: string
}

export type PaymentMethodKeyProps =
  | 'boleto'
  | 'pix'
  | 'cash'
  | 'card'
  | 'deposit'

export const paymentMethodsDB: PaymentMethodDTO[] = [
  {
    key: 'boleto',
    name: 'Boleto'
  },
  {
    key: 'pix',
    name: 'Pix'
  },
  {
    key: 'cash',
    name: 'Dinheiro'
  },
  {
    key: 'card',
    name: 'Cartão de Crédito'
  },
  {
    key: 'deposit',
    name: 'Depósito Bancário'
  }
]
