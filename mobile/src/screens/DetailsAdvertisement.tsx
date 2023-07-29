import { VStack, Text, HStack } from 'native-base'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Button } from '@components/Button'
import { ContentAdvertisement } from '@components/ContentAdvertisement'

export function DetailsAdvertisement() {
  return (
    <VStack flex={1} paddingTop={16}>
      <HeaderNavigation isGoBack hStackProps={{ px: 6, marginBottom: 3 }} />

      <VStack flex={1}>
        <ContentAdvertisement />
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
          <Text fontSize="sm">R$</Text> 120,00
        </Text>
        <Button
          title="Entrar em contato"
          typeColor="blue"
          typeIcon="whatsapp"
          buttonProps={{
            flex: 1
          }}
        />
      </HStack>
    </VStack>
  )
}
