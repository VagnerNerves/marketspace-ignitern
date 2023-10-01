import { useEffect, useRef } from 'react'
import { FlatList, HStack, Text, VStack, useToast } from 'native-base'

import { Modalize } from 'react-native-modalize'

import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { useAuth } from '@hooks/useAuth'
import { useProduct } from '@hooks/useProduct'

import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { CardInfoAdvertisements } from '@components/CardInfoAdvertisements'
import { InputSearchAdvertisements } from '@components/InputSearchAdvertisements'
import { CardAdvertisements } from '@components/CardAdvertisements'
import { ModalFilterAdvertisements } from '@components/ModalFilterAdvertisements'
import { Loading } from '@components/Loading'
import { ProductDTO } from '@dtos/ProductDTO'

export function Home() {
  const { user } = useAuth()
  const {
    myTotProducts,
    getMyProducts,
    isLoadingGetProducts,
    getProducts,
    products,
    filteredProducts,
    setFilteredProducts
  } = useProduct()

  const toast = useToast()

  const modalizeRef = useRef<Modalize>(null)
  const navigationStack = useNavigation<AppStackNavigatorRoutesProps>()

  function handleOpenModal() {
    modalizeRef.current?.open()
  }

  useEffect(() => {
    try {
      getMyProducts()
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível buscar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    }
  }, [])

  useEffect(() => {
    try {
      getProducts()
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível buscar os anúncios. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    }
  }, [])

  return (
    <VStack flex={1} paddingTop={16} px={6}>
      <HStack
        space={2}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={8}
      >
        <HStack flex={1} space={3} alignItems="center">
          <UserPhoto
            size={45}
            borderWidth={2}
            url={
              user.avatar
                ? `${api.defaults.baseURL}/images/${user.avatar}`
                : undefined
            }
          />
          <VStack flex={1}>
            <Text fontFamily="body" fontSize="md" color="gray.100">
              Boas vindas,
            </Text>
            <Text
              fontFamily="heading"
              fontSize="md"
              color="gray.100"
              numberOfLines={1}
            >
              {`${user.name}!`}
            </Text>
          </VStack>
        </HStack>
        <Button
          title="Criar anúncio"
          typeColor="black"
          typeIcon="plus"
          buttonProps={{
            width: 'auto',
            onPress: () =>
              navigationStack.navigate('createAdvertisement', { id: '' })
          }}
        />
      </HStack>

      {myTotProducts.totProductsIsActive > 0 && (
        <VStack space={3} marginBottom={8}>
          <Text fontFamily="body" fontSize="sm" color="gray.300">
            Seus produtos anunciados para venda
          </Text>

          <CardInfoAdvertisements
            numberTotalAdvertisementsIsActive={
              myTotProducts.totProductsIsActive
            }
          />
        </VStack>
      )}

      <VStack space={3} marginBottom={6}>
        <Text>Compre produtos variados</Text>

        <InputSearchAdvertisements
          getAdvertisements={getProducts}
          openModalFilter={handleOpenModal}
          inputProps={{
            value: filteredProducts.searchNameProduct,
            onChangeText: value =>
              setFilteredProducts(prevState => ({
                ...prevState,
                searchNameProduct: value.trimStart()
              }))
          }}
        />
        <ModalFilterAdvertisements modalizeRef={modalizeRef} />
      </VStack>

      {isLoadingGetProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={
            products && products.length % 2
              ? [...products, {} as ProductDTO]
              : products
          }
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
          renderItem={({ item }) =>
            item.id ? (
              <CardAdvertisements
                product={item}
                onNavigate={() =>
                  navigationStack.navigate('detailsAdvertisement', {
                    id: item.id
                  })
                }
              />
            ) : (
              <VStack flex={1}></VStack>
            )
          }
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
            paddingBottom: 24
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.100"
              textAlign="center"
            >
              Nenhum anúncio encontrado.
            </Text>
          )}
          contentContainerStyle={
            products.length === 0 && {
              flex: 1,
              justifyContent: 'center'
            }
          }
        />
      )}
    </VStack>
  )
}
