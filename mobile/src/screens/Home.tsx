import { useRef, useState } from 'react'
import { FlatList, HStack, Text, VStack } from 'native-base'

import { Modalize } from 'react-native-modalize'

import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { CardInfoAdvertisements } from '@components/CardInfoAdvertisements'
import { InputSearchAdvertisements } from '@components/InputSearchAdvertisements'
import { CardAdvertisements } from '@components/CardAdvertisements'
import { ModalFilterAdvertisements } from '@components/ModalFilterAdvertisements'

export function Home() {
  const [advertisement, setAdvertisement] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ])

  const modalizeRef = useRef<Modalize>(null)
  const navigationStack = useNavigation<AppStackNavigatorRoutesProps>()

  function handleOpenModal() {
    modalizeRef.current?.open()
  }

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
            url="https://github.com/VagnerNerves.png"
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
              Vagner Nerves!
            </Text>
          </VStack>
        </HStack>
        <Button
          title="Criar anúncio"
          typeColor="black"
          typeIcon="plus"
          buttonProps={{ width: 'auto' }}
        />
      </HStack>

      <VStack space={3} marginBottom={8}>
        <Text fontFamily="body" fontSize="sm" color="gray.300">
          Seus produtos anunciados para venda
        </Text>

        <CardInfoAdvertisements numberTotalAdvertisements={4} />
      </VStack>

      <VStack space={3} marginBottom={6}>
        <Text>Compre produtos variados</Text>

        <InputSearchAdvertisements openModalFilter={handleOpenModal} />
        <ModalFilterAdvertisements modalizeRef={modalizeRef} />
      </VStack>

      <FlatList
        data={advertisement}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CardAdvertisements
            typeTag="new"
            advertisements="active"
            onNavigate={() => navigationStack.navigate('detailsAdvertisement')}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          gap: 20,
          paddingBottom: 24
        }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
