import { TouchableOpacity } from 'react-native'
import { HStack, Text, useTheme } from 'native-base'

import { XCircle } from 'phosphor-react-native'

interface SelectTag {
  title: string
  value: boolean
  onPress: () => void
}
export function SelectTag({ title, value, onPress }: SelectTag) {
  const { colors } = useTheme()

  return (
    <HStack>
      <TouchableOpacity onPress={onPress}>
        <HStack
          backgroundColor={value ? 'blue.400' : 'gray.500'}
          alignItems="center"
          py="6px"
          paddingLeft={4}
          paddingRight={value ? '6px' : 4}
          rounded="full"
          space="6px"
        >
          <Text
            fontFamily="heading"
            fontSize="xs"
            color={value ? 'white' : 'gray.300'}
          >
            {title}
          </Text>
          {value && (
            <XCircle weight="fill" size={16} color={colors.gray[600]} />
          )}
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
