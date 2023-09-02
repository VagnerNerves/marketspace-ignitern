import { Alert, TouchableOpacity } from 'react-native'
import { HStack, Image, VStack, useTheme } from 'native-base'
import * as ImagePicker from 'expo-image-picker'

import { Plus, X } from 'phosphor-react-native'

export interface ImageSelectProps extends ImagePicker.ImagePickerAsset {}

interface SelectImage {
  urlImage?: string
  onAddImage?: (data: ImageSelectProps) => void
  onDeleteImage?: (uriImage: string) => void
}

export function SelectImage({
  urlImage,
  onDeleteImage,
  onAddImage
}: SelectImage) {
  const { colors } = useTheme()

  const isUrlImage = !!urlImage

  async function handleSearchOrDeleteImage() {
    if (isUrlImage) {
      if (!!onDeleteImage) {
        Alert.alert('Remover', 'Remover esta imagem?', [
          {
            text: 'sim',
            onPress: () => onDeleteImage(urlImage)
          },
          {
            text: 'não',
            style: 'cancel'
          }
        ])
      }
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1
      })

      if (!result.canceled) {
        const dataImage: ImageSelectProps = result.assets[0]

        !!onAddImage && onAddImage(dataImage)
      }
    }
  }

  return (
    <TouchableOpacity onPress={handleSearchOrDeleteImage}>
      <VStack
        w={100}
        h={100}
        bg="gray.500"
        borderRadius="6px"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {isUrlImage ? (
          <>
            <Image
              size={100}
              source={{ uri: urlImage }}
              alt="Imagem do Anúncio"
              resizeMode="cover"
            />
            <HStack position="absolute" right={1} top={1}>
              <HStack
                w={4}
                h={4}
                borderRadius="full"
                bg="gray.200"
                alignItems="center"
                justifyContent="center"
              >
                <X weight="fill" size={12} color={colors.gray[700]} />
              </HStack>
            </HStack>
          </>
        ) : (
          <Plus weight="regular" size={24} color={colors.gray[400]} />
        )}
      </VStack>
    </TouchableOpacity>
  )
}
