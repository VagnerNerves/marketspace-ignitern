import { useState } from 'react'
import { Platform } from 'react-native'

import {
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorRoutesProps } from '@routes/app.routes'

import { HeaderNavigation } from '@components/HeaderNavigation'
import { Button } from '@components/Button'
import { ImageSelectProps, SelectImage } from '@components/SelectImage'
import { Input } from '@components/Input'
import { Radio } from '@components/Radio'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { ContentAdvertisement } from '@components/ContentAdvertisement'

export function CreateAdvertisement() {
  const [preview, setPreview] = useState(false)
  const [acceptExchange, setAcceptExchange] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(false)
  const [selectedPix, setSelectedPix] = useState(false)
  const [selectedCash, setSelectedCash] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] = useState(false)
  const [selectedBankDeposit, setSelectedBankDeposit] = useState(false)

  const [images, setImages] = useState<ImageSelectProps[] | null>(null)
  const isDataImages = !!images

  const navigationStack = useNavigation<AppStackNavigatorRoutesProps>()

  function handleAddImage(data: ImageSelectProps) {
    setImages(current => (!!current ? [...current, data] : [data]))
  }

  function handleDeleteImage(uriImage: string) {
    if (isDataImages) {
      const dataImages = images.filter(image => image.uri !== uriImage)

      setImages(dataImages)
    }
  }

  if (preview) {
    return (
      <VStack flex={1}>
        <VStack
          bg="blue.400"
          alignItems="center"
          justifyContent="center"
          paddingTop={16}
          paddingBottom={4}
        >
          <Text fontFamily="heading" fontSize="md" color="gray.700">
            Pré visualização do anúncio
          </Text>
          <Text fontFamily="body" fontSize="sm" color="gray.700">
            É assim que seu produto vai aparecer!
          </Text>
        </VStack>

        <VStack flex={1}>
          <ContentAdvertisement />
        </VStack>

        <HStack bg="gray.700" px={6} paddingTop={5} paddingBottom={7} space={3}>
          <Button
            title="Voltar e editar"
            typeColor="gray"
            typeIcon="arrowLeft"
            buttonProps={{
              flex: 1,
              onPress: () => setPreview(false)
            }}
          />
          <Button
            title="Publicar"
            typeColor="blue"
            typeIcon="tag"
            buttonProps={{
              flex: 1
            }}
          />
        </HStack>
      </VStack>
    )
  }

  return (
    <VStack flex={1} paddingTop={16}>
      <HeaderNavigation
        isGoBack
        title="Criar Anúncio"
        hStackProps={{ px: 6, marginBottom: 6 }}
      />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack flex={1} px={6} marginBottom={6} space={8}>
            <VStack space={4}>
              <VStack space={1}>
                <Text fontFamily="heading" fontSize="md" color="gray.200">
                  Imagens
                </Text>
                <Text fontFamily="body" fontSize="sm" color="gray.300">
                  Escolha até 3 imagens para mostrar o quando o seu produto é
                  incrível!
                </Text>
              </VStack>
              <HStack space={2}>
                {isDataImages &&
                  images.map((dataImage, index) => {
                    return (
                      <SelectImage
                        key={index}
                        urlImage={dataImage.uri}
                        onDeleteImage={handleDeleteImage}
                      />
                    )
                  })}

                {(!isDataImages || images.length < 3) && (
                  <SelectImage onAddImage={handleAddImage} />
                )}
              </HStack>
            </VStack>

            <VStack space={4}>
              <Text fontFamily="heading" fontSize="md" color="gray.200">
                Sobre o produto
              </Text>
              <Input
                type="text"
                inputProps={{ placeholder: 'Título do anúncio' }}
              />
              <Input
                type="text"
                inputProps={{
                  placeholder: 'Descrição do Produto',
                  height: '160px',
                  textAlignVertical: 'top'
                }}
              />

              <Radio
                radioGroupProps={{
                  name: 'radioCreateAdvertisement'
                  //value: variavel,
                  //onChange: () => null
                }}
                options={[
                  { value: 'newProduct', text: 'Produto novo' },
                  { value: 'usedProduct', text: 'Produto usado' }
                ]}
              />
            </VStack>

            <VStack space={4}>
              <Text fontFamily="heading" fontSize="md" color="gray.200">
                Venda
              </Text>
              <Input
                type="price"
                inputProps={{
                  placeholder: 'Valor do produto'
                }}
              />

              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>
              <Switch
                value={acceptExchange}
                onValueChange={() => setAcceptExchange(prevState => !prevState)}
              />

              <VStack space={3}>
                <Text fontFamily="heading" fontSize="sm" color="gray.200">
                  Meios de pagamentos aceitos
                </Text>

                <VStack space={2}>
                  <Checkbox
                    title="Boleto"
                    value={selectedTicket}
                    onValueChange={() =>
                      setSelectedTicket(prevState => !prevState)
                    }
                  />
                  <Checkbox
                    title="Pix"
                    value={selectedPix}
                    onValueChange={() =>
                      setSelectedPix(prevState => !prevState)
                    }
                  />
                  <Checkbox
                    title="Dinheiro"
                    value={selectedCash}
                    onValueChange={() =>
                      setSelectedCash(prevState => !prevState)
                    }
                  />

                  <Checkbox
                    title="Cartão de Crédito"
                    value={selectedCreditCard}
                    onValueChange={() =>
                      setSelectedCreditCard(prevState => !prevState)
                    }
                  />

                  <Checkbox
                    title="Depósito Bancário"
                    value={selectedBankDeposit}
                    onValueChange={() =>
                      setSelectedBankDeposit(prevState => !prevState)
                    }
                  />
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>

      <HStack
        bg="gray.700"
        px={6}
        paddingTop={5}
        paddingBottom={7}
        space={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          title="Cancelar"
          typeColor="gray"
          buttonProps={{
            flex: 1,
            onPress: () => navigationStack.goBack()
          }}
        />
        <Button
          title="Avançar"
          typeColor="black"
          buttonProps={{
            flex: 1,
            onPress: () => setPreview(true)
          }}
        />
      </HStack>
    </VStack>
  )
}
