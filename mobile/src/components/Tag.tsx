import { Text, VStack, IStackProps } from 'native-base'

interface TagProps {
  type: 'new' | 'used'
  stackProps?: IStackProps
}
export function Tag({ type, stackProps }: TagProps) {
  return (
    <VStack
      py="2px"
      px={2}
      rounded="full"
      background={type === 'new' ? 'blue.700' : 'gray.200'}
      {...stackProps}
    >
      <Text fontFamily="heading" fontSize="10px" color="white">
        {type === 'new' ? 'NOVO' : 'USADO'}
      </Text>
    </VStack>
  )
}
