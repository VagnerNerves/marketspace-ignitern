import { HStack, Text, useTheme } from 'native-base'

import { Barcode, QrCode, Bank, Money, CreditCard } from 'phosphor-react-native'

interface PaymentMethodProps {
  title: string
  iconPayment: 'barCode' | 'qrCode' | 'bank' | 'money' | 'creditCard'
}
export function PaymentMethod({ title, iconPayment }: PaymentMethodProps) {
  const { colors } = useTheme()

  return (
    <HStack space={2} alignItems="center">
      {iconPayment === 'barCode' && (
        <Barcode weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'qrCode' && (
        <QrCode weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'money' && (
        <Money weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'creditCard' && (
        <CreditCard weight="regular" size={18} color={colors.gray[100]} />
      )}
      {iconPayment === 'bank' && (
        <Bank weight="regular" size={18} color={colors.gray[100]} />
      )}

      <Text fontFamily="body" fontSize="sm" color="gray.200">
        {title}
      </Text>
    </HStack>
  )
}
