import { Image, Text, VStack } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { Tag } from './Tag'

export function CardAdvertisements() {
  return (
    <VStack flex={1}>
      <VStack h={24} borderRadius="6px" overflow="hidden">
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
          type="new"
          stackProps={{ position: 'absolute', top: '4px', right: '4px' }}
        />
      </VStack>
      <VStack marginLeft="2px">
        <Text fontFamily="body" fontSize="sm" color="gray.200">
          Tênis branco
        </Text>
        <Text fontFamily="heading" fontSize="xs" color="gray.100">
          R$ <Text fontSize="md">59.90</Text>
        </Text>
      </VStack>
    </VStack>
  )
}
