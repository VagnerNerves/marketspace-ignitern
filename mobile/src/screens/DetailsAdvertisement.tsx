import { useEffect, useState } from 'react'
import { Alert, Linking } from 'react-native'
import { VStack, Text, HStack, useToast } from 'native-base'

import { api } from '@services/api'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'
import { useProduct } from '@hooks/useProduct'

import { AppError } from '@utils/AppError'
import { formattedNumberForRealBRL } from '@utils/validationAndFormattedNumberForReal'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Button } from '@components/Button'
import { ContentAdvertisement } from '@components/ContentAdvertisement'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  id: string
}

export function DetailsAdvertisement() {
  const [isLoadingGetProduct, setIsLoadingGetProduct] = useState<boolean>(true)
  const { user } = useAuth()
  const { product, getProduct } = useProduct()

  const route = useRoute()
  const navigate = useNavigation()
  const toast = useToast()

  const { id } = route.params as RouteParamsProps

  async function handleGetInTouch() {
    const message = `Estou entrando em contato pois fiquei interessado no produto ${product.name}. Ainda esta dísponivel?`

    const urlWhats = `https://wa.me/55${product.user.tel}?text=${message}`

    const supportedLink = await Linking.canOpenURL(urlWhats)

    if (supportedLink) {
      Linking.openURL(urlWhats)
    } else {
      Alert.alert(
        'Contato',
        `Favor entrar em contato com o anunciante pelo telefone: 55 ${product.user.tel}`
      )
    }
  }

  async function fetchProduct() {
    try {
      setIsLoadingGetProduct(true)

      await getProduct(id)
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível buscar o anúncio. Tente novamente mais tarde'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })

      navigate.goBack()
    } finally {
      setIsLoadingGetProduct(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <VStack flex={1} paddingTop={16}>
      <HeaderNavigation isGoBack hStackProps={{ px: 6, marginBottom: 3 }} />

      {isLoadingGetProduct ? (
        <Loading />
      ) : (
        <>
          <VStack flex={1}>
            <ContentAdvertisement
              product={{
                name: product.name,
                description: product.description,
                price: product.price,
                acceptTrade: product.accept_trade,
                isNew: product.is_new,
                isActive: product.is_active,
                images: product.product_images
                  ? product.product_images.map(
                      image => `${api.defaults.baseURL}/images/${image.path}`
                    )
                  : [],
                paymentMethods: product.payment_methods
              }}
              user={product.user ? product.user : user}
            />
          </VStack>

          <HStack
            bg="gray.700"
            px={6}
            paddingTop={5}
            paddingBottom={7}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text flex={1} fontFamily="heading" fontSize="2xl" color="blue.700">
              <Text fontSize="sm">R$</Text>{' '}
              {formattedNumberForRealBRL(product.price)}
            </Text>
            <Button
              title="Entrar em contato"
              typeColor="blue"
              typeIcon="whatsapp"
              buttonProps={{
                flex: 1,
                onPress: handleGetInTouch
              }}
            />
          </HStack>
        </>
      )}
    </VStack>
  )
}
