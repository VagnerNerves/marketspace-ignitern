import { useState } from 'react'

import { FlatList, HStack, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Select } from '@components/Select'
import { CardAdvertisements } from '@components/CardAdvertisements'

export function MyAdvertisements() {
  const [service, setService] = useState('')

  const navigatorStack = useNavigation<AppStackNavigatorRoutesProps>()

  const [advertisement, setAdvertisement] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ])

  console.log(service)

  return (
    <VStack px={6} paddingTop={16}>
      <HeaderNavigation
        title="Meus anúncios"
        typeButton="plus"
        onPressButton={() => navigatorStack.navigate('createAdvertisement')}
      />

      <HStack
        justifyContent="space-between"
        alignItems="center"
        paddingTop={8}
        paddingBottom={5}
      >
        <Text>9 anúncios</Text>

        <Select
          items={[
            { label: 'Todos', value: 'all' },
            { label: 'Ativos', value: 'active' },
            { label: 'Inativos', value: 'inactive' }
          ]}
          selectProps={{
            selectedValue: service,
            onValueChange: item => setService(item)
          }}
        />
      </HStack>

      <FlatList
        data={advertisement}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CardAdvertisements
            typeTag="used"
            advertisements="inactive"
            onNavigate={() => navigatorStack.navigate('detailsMyAdvertisement')}
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
