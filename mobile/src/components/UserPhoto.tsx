import { User } from 'phosphor-react-native'

import { Image, VStack, IStackProps, useTheme } from 'native-base'

interface UserPhotoProps {
  size: number
  borderWidth: 1 | 2 | 3
  borderColor?: 'blue' | 'gray'
  url?: string
  stackProps?: IStackProps
}

export function UserPhoto({
  size,
  borderWidth,
  borderColor = 'blue',
  url,
  stackProps
}: UserPhotoProps) {
  const { colors } = useTheme()

  return (
    <VStack
      bg="gray.500"
      w={`${size}px`}
      h={`${size}px`}
      rounded="full"
      borderWidth={borderWidth}
      borderColor={borderColor === 'blue' ? 'blue.400' : 'gray.700'}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      {...stackProps}
    >
      {url ? (
        <Image
          size={`${size}px`}
          source={{
            uri: url
          }}
          alt="Foto do Usuário"
          resizeMode="cover"
        />
      ) : (
        <User weight="bold" size={`${size / 2}px`} color={colors.gray[400]} />
      )}
    </VStack>
  )
}
