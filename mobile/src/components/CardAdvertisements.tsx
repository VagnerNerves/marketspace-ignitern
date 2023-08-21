import { Image, Text, VStack } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { TYPE_TAG, Tag } from './Tag'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CardAdvertisementsProps {
  typeTag: TYPE_TAG
  advertisements: 'active' | 'inactive'
  onNavigate?: () => void
}
export function CardAdvertisements({
  typeTag,
  advertisements,
  onNavigate
}: CardAdvertisementsProps) {
  return (
    <VStack flex={1}>
      <TouchableOpacity onPress={onNavigate}>
        <VStack h={24} borderRadius="6px" overflow="hidden">
          {advertisements === 'inactive' && (
            <>
              <VStack
                bg="gray.100"
                width="100%"
                height="100%"
                zIndex={2}
                opacity={0.45}
                position="absolute"
              />
              <Text
                position="absolute"
                bottom={2}
                left={2}
                fontFamily="heading"
                fontSize="xs"
                color="gray.700"
                zIndex={3}
              >
                ANÚNCIO DESATIVADO
              </Text>
            </>
          )}
          <Image
            h={24}
            source={{
              uri: 'https://levezastore.com.br/cdn/shop/products/tenis-masculino-fashion-tenis-masculino-fashion-ga-leveza-store-325142_1024x.jpg'
            }}
            alt="Foto do Produto"
            resizeMode="cover"
          />
          <UserPhoto
            size={24}
            borderWidth={1}
            borderColor="gray"
            url="https://github.com/VagnerNerves.png"
            stackProps={{
              position: 'absolute',
              top: '4px',
              left: '4px'
            }}
          />
          <Tag
            type={typeTag}
            stackProps={{ position: 'absolute', top: '4px', right: '4px' }}
          />
        </VStack>
        <VStack marginLeft="2px">
          <Text
            fontFamily="body"
            fontSize="sm"
            color={advertisements === 'active' ? 'gray.200' : 'gray.400'}
          >
            Tênis branco
          </Text>
          <Text
            fontFamily={advertisements === 'active' ? 'heading' : 'body'}
            fontSize="xs"
            color={advertisements === 'active' ? 'gray.100' : 'gray.400'}
          >
            R$ <Text fontSize="md">59.90</Text>
          </Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  )
}
