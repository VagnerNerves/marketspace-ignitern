import { User } from 'phosphor-react-native'

import { Image, VStack, useTheme } from 'native-base'

interface UserPhotoProps {
  size: number
  borderWidth: 1 | 2 | 3
  borderColor?: 'blue' | 'gray'
  url?: string
}

export function UserPhoto({
  size,
  borderWidth,
  borderColor = 'blue',
  url
}: UserPhotoProps) {
  const { colors } = useTheme()

  return (
    <VStack
      bg="gray.500"
      w={size}
      h={size}
      rounded="full"
      borderWidth={borderWidth}
      borderColor={borderColor === 'blue' ? 'blue.400' : 'gray.700'}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {url ? (
        <Image
          size={size}
          source={{
            uri: url
          }}
          alt="Foto do Usuário"
          resizeMode="cover"
        />
      ) : (
        <User weight="bold" size={size / 2} color={colors.gray[400]} />
      )}
    </VStack>
  )
}
