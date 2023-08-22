import { HStack, ScrollView, Text, VStack } from 'native-base'

import { UserPhoto } from './UserPhoto'
import { Tag } from './Tag'
import { PaymentMethod } from './PaymentMethod'
import { MyCarousel } from './MyCarousel'

export function ContentAdvertisement() {
  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack>
          <MyCarousel
            data={[
              'https://cdn.dooca.store/19586/products/s3.jpg?v=1648733585&webp=0',
              'https://images-americanas.b2w.io/produtos/4085781669/imagens/bicicleta-aro-29-absolute-mtb-nero-azul/4085781853_1_large.jpg',
              'https://http2.mlstatic.com/D_NQ_NP_833105-MLB49306431123_032022-O.webp'
            ]}
            height={280}
            active={false}
          />
        </VStack>
        <VStack px={6} paddingTop={5} paddingBottom={6} space={6}>
          <HStack alignItems="center" space={2}>
            <UserPhoto
              size={24}
              borderWidth={2}
              url="https://github.com/VagnerNerves.png"
            />
            <Text fontFamily="body" fontSize="sm" color="gray.100">
              Vagner Nerves
            </Text>
          </HStack>

          <VStack space={2}>
            <Tag type="new" />

            <HStack alignItems="center" justifyContent="space-between">
              <Text
                flex={1}
                fontFamily="heading"
                fontSize="xl"
                color="gray.100"
              >
                Bicicleta
              </Text>
              <Text fontFamily="heading" fontSize="xl" color="blue.400">
                <Text fontSize="sm">R$</Text> 120,00
              </Text>
            </HStack>

            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.200"
              lineHeight="18.2"
            >
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>
          </VStack>

          <VStack space={4}>
            <Text fontFamily="heading" fontSize="sm" color="gray.200">
              Aceita troca? <Text fontFamily="body">Sim</Text>
            </Text>

            <VStack space={2}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Meios de pagamento:
              </Text>

              <VStack space={1}>
                <PaymentMethod title="Boleto" iconPayment="barCode" />
                <PaymentMethod title="PIX" iconPayment="qrCode" />
                <PaymentMethod title="Dinheiro" iconPayment="money" />
                <PaymentMethod
                  title="Cartão de Crédito"
                  iconPayment="creditCard"
                />
                <PaymentMethod title="Depósito Bancário" iconPayment="bank" />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
