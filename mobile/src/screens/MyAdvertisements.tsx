import { useCallback, useEffect, useState } from 'react'

import { FlatList, HStack, Text, VStack, useToast } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { useProduct } from '@hooks/useProduct'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Select } from '@components/Select'
import { CardAdvertisements } from '@components/CardAdvertisements'
import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'

type FilterAdvertisementsProps = 'all' | 'active' | 'inactive'

export function MyAdvertisements() {
  const { myTotProducts, myProducts, getMyProducts } = useProduct()

  const toast = useToast()

  const navigatorStack = useNavigation<AppStackNavigatorRoutesProps>()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [myProductsFiltered, setMyProductsFiltered] =
    useState<ProductDTO[]>(myProducts)
  const [filterAdvertisements, setFilterAdvertisements] =
    useState<FilterAdvertisementsProps>('all')

  useFocusEffect(
    useCallback(() => {
      try {
        setIsLoading(true)
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
      } finally {
        setIsLoading(false)
      }
    }, [])
  )

  useEffect(() => {
    if (filterAdvertisements === 'all') {
      setMyProductsFiltered(myProducts)
    }

    if (filterAdvertisements === 'active') {
      const filtered = myProducts.filter(item => item.is_active === true)
      setMyProductsFiltered(filtered)
    }

    if (filterAdvertisements === 'inactive') {
      const filtered = myProducts.filter(item => item.is_active === false)
      setMyProductsFiltered(filtered)
    }
  }, [filterAdvertisements])

  return (
    <VStack px={6} paddingTop={16} flex={1}>
      <HeaderNavigation
        title="Meus anúncios"
        typeButton="plus"
        onPressButton={() => navigatorStack.navigate('createAdvertisement')}
      />

      {myProducts.length > 0 && (
        <HStack
          justifyContent="space-between"
          alignItems="center"
          paddingTop={8}
          paddingBottom={5}
        >
          <Text>
            {myTotProducts.totProducts}{' '}
            {myTotProducts.totProducts === 1 ? 'anúncio' : 'anúncios'}
          </Text>

          <Select
            items={[
              { label: 'Todos', value: 'all' as FilterAdvertisementsProps },
              { label: 'Ativos', value: 'active' as FilterAdvertisementsProps },
              {
                label: 'Inativos',
                value: 'inactive' as FilterAdvertisementsProps
              }
            ]}
            selectProps={{
              selectedValue: filterAdvertisements,
              onValueChange: item =>
                setFilterAdvertisements(item as FilterAdvertisementsProps)
            }}
          />
        </HStack>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={myProductsFiltered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardAdvertisements
              product={item}
              onNavigate={() =>
                navigatorStack.navigate('detailsMyAdvertisement')
              }
            />
          )}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
            paddingBottom: 24
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            myProducts.length === 0 ? (
              <Text
                fontFamily="body"
                fontSize="sm"
                color="gray.100"
                textAlign="center"
              >
                Você não possui nenhum anúncio cadastrado.
              </Text>
            ) : (
              <></>
            )
          }
          contentContainerStyle={
            myProducts.length === 0 && {
              flex: 1,
              justifyContent: 'center'
            }
          }
        />
      )}
    </VStack>
  )
}
