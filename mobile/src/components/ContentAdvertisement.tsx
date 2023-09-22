import { HStack, ScrollView, Text, VStack } from 'native-base'

import { api } from '@services/api'
import { ProductDTO } from '@dtos/ProductDTO'

import { formattedNumberForRealBRL } from '@utils/validationAndFormattedNumberForReal'

import { UserPhoto } from './UserPhoto'
import { Tag } from './Tag'
import { PaymentMethod } from './PaymentMethod'
import { MyCarousel } from './MyCarousel'
import { PaymentMethodKeyProps } from '@dtos/PaymentMethodDTO'

interface ContentAdvertisementProps {
  product: ProductDTO
}

export function ContentAdvertisement({ product }: ContentAdvertisementProps) {
  const productImages = product.product_images
    ? product.product_images.reduce((newValue: string[], value) => {
        newValue.push(`${api.defaults.baseURL}/images/${value.path}`)

        return newValue
      }, [])
    : []

  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack>
          {productImages && (
            <MyCarousel
              data={productImages}
              height={280}
              active={product.is_active ? true : false}
            />
          )}
        </VStack>
        <VStack px={6} paddingTop={5} paddingBottom={6} space={6}>
          <HStack alignItems="center" space={2}>
            <UserPhoto
              size={24}
              borderWidth={2}
              url={
                product.user
                  ? `${api.defaults.baseURL}/images/${product.user.avatar}`
                  : undefined
              }
            />
            <Text fontFamily="body" fontSize="sm" color="gray.100">
              {product.user ? product.user.name : ''}
            </Text>
          </HStack>

          <VStack space={2}>
            <Tag type={product.is_new ? 'new' : 'used'} />

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
                {product.accept_trade ? 'Sim' : 'Não'}
              </Text>
            </Text>

            <VStack space={2}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Meios de pagamento:
              </Text>

              <VStack space={1}>
                {product.payment_methods &&
                  product.payment_methods.map(payment_Method => (
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
