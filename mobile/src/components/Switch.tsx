import { TouchableOpacity } from 'react-native'

import { HStack, VStack } from 'native-base'

interface SwitchProps {
  value: boolean
  onValueChange: () => void
}
export function Switch({ value, onValueChange }: SwitchProps) {
  return (
    <HStack>
      <TouchableOpacity onPress={onValueChange}>
        <HStack
          width="50px"
          height={7}
          rounded="full"
          backgroundColor={value ? 'blue.400' : 'gray.500'}
          alignItems="center"
        >
          <VStack
            width={6}
            height={6}
            backgroundColor="white"
            rounded="full"
            position="absolute"
            left={value ? {} : '2px'}
            right={value ? '2px' : {}}
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
