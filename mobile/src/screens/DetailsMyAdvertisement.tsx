import { useState } from 'react'
import { VStack, Text, HStack, ScrollView } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Button } from '@components/Button'
import { ContentAdvertisement } from '@components/ContentAdvertisement'

export function DetailsMyAdvertisement() {
  const [activeAdvertisement, setActiveAdvertisement] = useState<boolean>(true)

  const navigatorStack = useNavigation<AppStackNavigatorRoutesProps>()

  return (
    <VStack flex={1} paddingTop={16}>
      <HeaderNavigation
        isGoBack
        typeButton="pencil"
        onPressButton={() => null}
        hStackProps={{ px: 6, marginBottom: 3 }}
      />

      <ScrollView flex={1}>
        <ContentAdvertisement />

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
              activeAdvertisement === true
                ? 'Desativar anúncio'
                : 'Reativar anúncio'
            }
            typeColor={activeAdvertisement === true ? 'black' : 'blue'}
            typeIcon="power"
            buttonProps={{
              onPress: () => setActiveAdvertisement(current => !current)
            }}
          />
          <Button title="Excluir anúncio" typeColor="gray" typeIcon="trash" />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
