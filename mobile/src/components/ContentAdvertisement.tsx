import { HStack, ScrollView, Text, VStack } from 'native-base'

import { api } from '@services/api'
import { PaymentMethodDTO, PaymentMethodKeyProps } from '@dtos/PaymentMethodDTO'

import { formattedNumberForRealBRL } from '@utils/validationAndFormattedNumberForReal'

import { UserPhoto } from './UserPhoto'
import { Tag } from './Tag'
import { PaymentMethod } from './PaymentMethod'
import { MyCarousel } from './MyCarousel'

interface ContentAdvertisementProps {
  product: {
    name: string
    description: string
    price: number
    acceptTrade: boolean
    isNew: boolean
    isActive: boolean
    images: string[]
    paymentMethods: PaymentMethodDTO[]
  }
  user: {
    avatar: string
    name: string
  }
}

export function ContentAdvertisement({
  product,
  user
}: ContentAdvertisementProps) {
  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack>
          {product.images && product.images.length > 0 && (
            <MyCarousel
              data={product.images}
              height={280}
              active={product.isActive ? true : false}
            />
          )}
        </VStack>
        <VStack px={6} paddingTop={5} paddingBottom={6} space={6}>
          <HStack alignItems="center" space={2}>
            <UserPhoto
              size={24}
              borderWidth={2}
              url={
                user
                  ? `${api.defaults.baseURL}/images/${user.avatar}`
                  : undefined
              }
            />
            <Text fontFamily="body" fontSize="sm" color="gray.100">
              {user ? user.name : ''}
            </Text>
          </HStack>

          <VStack space={2}>
            <Tag type={product.isNew ? 'new' : 'used'} />

            <HStack alignItems="center" justifyContent="space-between">
              <Text
                flex={1}
                fontFamily="heading"
                fontSize="xl"
                color="gray.100"
              >
                {product.name}
              </Text>
              <Text fontFamily="heading" fontSize="xl" color="blue.400">
                <Text fontSize="sm">R$</Text>{' '}
                {formattedNumberForRealBRL(product.price)}
              </Text>
            </HStack>

            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.200"
              lineHeight="18.2"
            >
              {product.description}
            </Text>
          </VStack>

          <VStack space={4}>
            <Text fontFamily="heading" fontSize="sm" color="gray.200">
              Aceita troca?{' '}
              <Text fontFamily="body">
                {product.acceptTrade ? 'Sim' : 'Não'}
              </Text>
            </Text>

            <VStack space={2}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Meios de pagamento:
              </Text>

              <VStack space={1}>
                {product.paymentMethods &&
                  product.paymentMethods.map(payment_Method => (
                    <PaymentMethod
                      key={payment_Method.key}
                      title={payment_Method.name}
                      iconPayment={payment_Method.key as PaymentMethodKeyProps}
                    />
                  ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
