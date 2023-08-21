import { Text, VStack, IStackProps, HStack } from 'native-base'

export type TYPE_TAG = 'new' | 'used'

interface TagProps {
  type: TYPE_TAG
  stackProps?: IStackProps
}
export function Tag({ type, stackProps }: TagProps) {
  return (
    <HStack {...stackProps}>
      <VStack
        py="2px"
        px={2}
        rounded="full"
        background={type === 'new' ? 'blue.700' : 'gray.200'}
      >
        <Text fontFamily="heading" fontSize="10px" color="white">
          {type === 'new' ? 'NOVO' : 'USADO'}
        </Text>
      </VStack>
    </HStack>
  )
}
