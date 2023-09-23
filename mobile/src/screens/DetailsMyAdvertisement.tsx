import { useEffect, useState } from 'react'
import { VStack, ScrollView, useToast } from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Button } from '@components/Button'
import { ContentAdvertisement } from '@components/ContentAdvertisement'
import { useProduct } from '@hooks/useProduct'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  id: string
}

export function DetailsMyAdvertisement() {
  const [isLoadingGetProduct, setIsLoadingGetProduct] = useState<boolean>(true)
  const [isLoadingActiveOrInactive, setIsLoadingActiveOrInactive] =
    useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const {
    product,
    getProduct,
    updateProductForActiveOrInactive,
    deleteProduct
  } = useProduct()
  const route = useRoute()
  const navigate = useNavigation()
  const toast = useToast()

  const { id } = route.params as RouteParamsProps

  const navigatorStack = useNavigation<AppStackNavigatorRoutesProps>()

  async function handleActiveOrInactiveAdvertisement() {
    try {
      setIsLoadingActiveOrInactive(true)

      await updateProductForActiveOrInactive(product.id, !product.is_active)
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível desativa o anúncio no momento.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    } finally {
      setIsLoadingActiveOrInactive(false)
    }
  }

  async function handleDeleteProduct() {
    try {
      setIsLoadingDelete(true)
      await deleteProduct(product.id)

      navigate.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível deletar o anúncio. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  useEffect(() => {
    try {
      setIsLoadingGetProduct(true)

      getProduct(id)
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
  }, [])

  return (
    <VStack flex={1} paddingTop={16}>
      <HeaderNavigation
        isGoBack
        typeButton="pencil"
        onPressButton={() => navigatorStack.navigate('createAdvertisement')}
        hStackProps={{ px: 6, marginBottom: 3 }}
      />

      {isLoadingGetProduct ? (
        <Loading />
      ) : (
        <ScrollView flex={1}>
          <ContentAdvertisement product={product} />

          <VStack
            px={6}
            paddingTop={5}
            paddingBottom={7}
            alignItems="center"
            justifyContent="space-between"
            space={2}
          >
            <Button
              title={
                product.is_active === true
                  ? 'Desativar anúncio'
                  : 'Reativar anúncio'
              }
              typeColor={product.is_active === true ? 'black' : 'blue'}
              typeIcon="power"
              buttonProps={{
                onPress: handleActiveOrInactiveAdvertisement,
                isLoading: isLoadingActiveOrInactive,
                isDisabled: isLoadingDelete
              }}
            />

            <Button
              title="Excluir anúncio"
              typeColor="gray"
              typeIcon="trash"
              buttonProps={{
                onPress: handleDeleteProduct,
                isLoading: isLoadingDelete,
                isDisabled: isLoadingActiveOrInactive
              }}
            />
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
