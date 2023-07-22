import { TouchableOpacity } from 'react-native'
import { HStack, Text, VStack } from 'native-base'

import { Check } from 'phosphor-react-native'

interface CheckBoxProps {
  title: string
  value: boolean
  onValueChange: () => void
}
export function Checkbox({
  title,
  value = true,
  onValueChange
}: CheckBoxProps) {
  return (
    <HStack>
      <TouchableOpacity onPress={onValueChange}>
        <HStack
          alignItems="center"
          justifyContent="center"
          alignSelf="center"
          height={6}
          space="11px"
        >
          <VStack
            width="18px"
            height="18px"
            backgroundColor={value ? 'blue.400' : 'white'}
            borderWidth="2px"
            borderColor={value ? 'blue.400' : 'gray.400'}
            borderRadius="1px"
            alignItems="center"
            justifyContent="center"
          >
            {value && <Check weight="bold" size={12} color="white" />}
          </VStack>

          <Text fontFamily="body" fontSize="md" color="gray.200">
            {title}
          </Text>
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
