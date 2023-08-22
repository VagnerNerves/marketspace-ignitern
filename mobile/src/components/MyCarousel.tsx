import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Center, HStack, Image, Text, VStack } from 'native-base'

import Carousel from 'react-native-reanimated-carousel'

interface MyCarouselProps {
  data: string[]
  active: boolean
  height?: number
}
export function MyCarousel({ data, active, height }: MyCarouselProps) {
  const [currentPhoto, setCurrentPhoto] = useState<number>(0)

  const width = Dimensions.get('window').width

  function isActive() {
    return active === false ? (
      <VStack
        width={width}
        height={height ? height : width / 2}
        position="absolute"
        zIndex={2}
      >
        <Center
          position="absolute"
          zIndex={2}
          textAlign="center"
          width={width}
          height={height ? height : width / 2}
        >
          <Text fontFamily="heading" fontSize="sm" color="gray.700">
            ANÚNCIO DESATIVADO
          </Text>
        </Center>
        <VStack
          width="full"
          height="full"
          bg="gray.100"
          opacity={0.6}
          alignItems="center"
          justifyContent="center"
        />
      </VStack>
    ) : (
      <></>
    )
  }

  if (data.length === 1) {
    return (
      <VStack>
        {isActive()}
        <Image
          source={{ uri: data[0] }}
          alt="Image do produto"
          resizeMode="cover"
          width={width}
          height={height ? height : width / 2}
        />
      </VStack>
    )
  }

  return (
    <VStack>
      {isActive()}
      <Carousel
        width={width}
        height={height ? height : width / 2}
        data={data}
        pagingEnabled={true}
        onSnapToItem={index => setCurrentPhoto(index)}
        renderItem={({ index }) => (
          <VStack
            style={{
              flex: 1
            }}
          >
            <Image
              source={{ uri: data[index] }}
              alt="Image do produto"
              resizeMode="cover"
              flex={1}
            />
          </VStack>
        )}
      />
      <HStack w="full" position="absolute" bottom="2px" px="2px" space={1}>
        {data.map((value, index) => {
          return (
            <VStack
              key={index}
              h={1}
              rounded="full"
              flex={1}
              backgroundColor={'gray.700'}
              opacity={currentPhoto === index ? 100 : 50}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}
