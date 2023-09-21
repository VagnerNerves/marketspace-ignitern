import { TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AppBottomNavigatorRoutesProps } from '@routes/app.routes'

import { Tag, ArrowRight } from 'phosphor-react-native'

import { HStack, Text, VStack, useTheme } from 'native-base'

interface CardInfoAdvertisementsProps {
  numberTotalAdvertisementsIsActive: number
}

export function CardInfoAdvertisements({
  numberTotalAdvertisementsIsActive
}: CardInfoAdvertisementsProps) {
  const { colors } = useTheme()

  const navigationBottom = useNavigation<AppBottomNavigatorRoutesProps>()

  function handleScreenMyAdvertisements() {
    navigationBottom.navigate('myAdvertisements')
  }

  return (
    <TouchableOpacity onPress={handleScreenMyAdvertisements}>
      <HStack
        w="full"
        py={3}
        px={4}
        backgroundColor="blue.100"
        borderRadius="6px"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack flex={1} space={4} alignItems="center">
          <Tag weight="regular" size={22} color={colors.blue[700]} />

          <VStack>
            <Text fontFamily="heading" fontSize="xl" color="gray.200">
              {numberTotalAdvertisementsIsActive}
            </Text>
            <Text fontFamily="body" fontSize="xs" color="gray.200">
              anúncions ativos
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center" space={2}>
          <Text fontFamily="heading" fontSize="xs" color="blue.700">
            Meus anúncios
          </Text>
          <ArrowRight weight="bold" size={16} color={colors.blue[700]} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  )
}
