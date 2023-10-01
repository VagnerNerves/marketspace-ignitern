import { Image, Text, VStack } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { TYPE_TAG, Tag } from './Tag'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProductDTO } from '@dtos/ProductDTO'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { formattedNumberForRealBRL } from '@utils/validationAndFormattedNumberForReal'

interface CardAdvertisementsProps {
  product: ProductDTO
  onNavigate?: () => void
}
export function CardAdvertisements({
  product,
  onNavigate
}: CardAdvertisementsProps) {
  const { user } = useAuth()

  return (
    <VStack flex={1}>
      <TouchableOpacity onPress={onNavigate}>
        <VStack h={24} borderRadius="6px" overflow="hidden">
          {product.is_active === false && (
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
              uri: product.product_images[0]
                ? `${api.defaults.baseURL}/images/${product.product_images[0].path}`
                : undefined
            }}
            alt="Foto do Produto"
            resizeMode="cover"
          />
          <UserPhoto
            size={24}
            borderWidth={1}
            borderColor="gray"
            url={`${api.defaults.baseURL}/images/${
              product.user ? product.user.avatar : user.avatar
            }`}
            stackProps={{
              position: 'absolute',
              top: '4px',
              left: '4px'
            }}
          />
          <Tag
            type={product.is_new === true ? 'new' : 'used'}
            stackProps={{ position: 'absolute', top: '4px', right: '4px' }}
          />
        </VStack>
        <VStack marginLeft="2px">
          <Text
            fontFamily="body"
            fontSize="sm"
            color={product.is_active === true ? 'gray.200' : 'gray.400'}
            numberOfLines={2}
          >
            {product.name}
          </Text>
          <Text
            fontFamily={product.is_active === true ? 'heading' : 'body'}
            fontSize="xs"
            color={product.is_active === true ? 'gray.100' : 'gray.400'}
          >
            R${' '}
            <Text fontSize="md">
              {formattedNumberForRealBRL(product.price)}
            </Text>
          </Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  )
}
