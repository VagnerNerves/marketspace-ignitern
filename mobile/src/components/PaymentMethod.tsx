import { HStack, Text, useTheme } from 'native-base'

import { PaymentMethodKeyProps } from '@dtos/PaymentMethodDTO'

import { Barcode, QrCode, Bank, Money, CreditCard } from 'phosphor-react-native'

interface PaymentMethodProps {
  title: string
  iconPayment: PaymentMethodKeyProps
}
export function PaymentMethod({ title, iconPayment }: PaymentMethodProps) {
  const { colors } = useTheme()

  return (
    <HStack space={2} alignItems="center">
      {iconPayment === 'boleto' && (
        <Barcode weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'pix' && (
        <QrCode weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'cash' && (
        <Money weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'card' && (
        <CreditCard weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'deposit' && (
        <Bank weight="regular" size={18} color={colors.gray[100]} />
      )}

      <Text fontFamily="body" fontSize="sm" color="gray.200">
        {title}
      </Text>
    </HStack>
  )
}
