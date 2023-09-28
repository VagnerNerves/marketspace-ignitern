import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import {
  FormControl,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from 'native-base'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
import { ProductDTO } from '@dtos/ProductDTO'
import { PaymentMethodKeyProps, paymentMethodsDB } from '@dtos/PaymentMethodDTO'
import { useAuth } from '@hooks/useAuth'

const paymentMethodOptions = paymentMethodsDB.map(method => method.key)

const createdAdvertisementSchema = yup.object({
  images: yup
    .array()
    .of(
      yup.object({
        uri: yup.string().required(),
        id: yup.string()
      })
    )
    .min(1, 'Informe uma Imagem.')
    .required('Informe uma Imagem.'),
  name: yup.string().required('Informe o título do anúncio.'),
  description: yup.string().required('Informe a descrição do produto.'),
  IsNewOrUsed: yup
    .string()
    .oneOf(['', 'new', 'used'])
    .required('Informe se o produto é novo ou usado.'),
  price: yup.number().required('Informe o valor do produto.'),
  acceptTrade: yup.boolean().default(false),
  methodPayments: yup
    .array()
    .of(
      yup.object({
        key: yup.string().required().oneOf(paymentMethodOptions),
        name: yup.string().required()
      })
    )
    .min(1, 'Selecione um meio de pagamento.')
    .required('Selecione um meio de pagamento.')
})

type FormDataProps = yup.InferType<typeof createdAdvertisementSchema>

export function CreateAdvertisement() {
  const [preview, setPreview] = useState(false)

  const { user } = useAuth()

  const navigationStack = useNavigation<AppStackNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(createdAdvertisementSchema)
  })

  function handleAddImage(data: ImageSelectProps) {
    const imagesDataForm = getValues().images
    const newImageSelect = { uri: data.uri }

    setValue(
      'images',
      !!imagesDataForm ? [...imagesDataForm, newImageSelect] : [newImageSelect]
    )
    trigger('images')
  }

  function handleDeleteImage(uriImage: string) {
    const imagesDataForm = getValues().images

    if (!!imagesDataForm) {
      const dataImages = imagesDataForm.filter(image => image.uri !== uriImage)

      setValue('images', dataImages)
      trigger('images')
    }
  }

  function handleAddOrRemoveMethodPayment(
    key: PaymentMethodKeyProps,
    name: string
  ) {
    const methodPaymentsDataForm = getValues('methodPayments')
    const newMethodPayment = { key, name }

    if (!!methodPaymentsDataForm) {
      const methodPaymentRemove = methodPaymentsDataForm.filter(
        method => method.key !== newMethodPayment.key
      )

      if (methodPaymentRemove.length !== methodPaymentsDataForm.length) {
        setValue('methodPayments', [...methodPaymentRemove])
      } else {
        setValue('methodPayments', [...methodPaymentRemove, newMethodPayment])
      }
    } else {
      setValue('methodPayments', [newMethodPayment])
    }

    trigger('methodPayments')
  }

  useEffect(() => {
    // reset({
    //   ...getValues(),
    //   images: [
    //     { id: '', uri: '' },
    //     { id: '', uri: '' }
    //   ]
    // })
  }, [])

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
          <ContentAdvertisement
            product={{
              name: getValues().name,
              description: getValues().description,
              price: getValues().price,
              acceptTrade: getValues().acceptTrade,
              isNew: getValues().IsNewOrUsed === 'new',
              isActive: true,
              images: getValues().images.map(image => image.uri),
              paymentMethods: getValues().methodPayments
            }}
            user={user}
          />
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

              <Controller
                control={control}
                name="images"
                render={({ field: { value } }) => (
                  <HStack space={2}>
                    {!!value &&
                      value.map((dataImage, index) => {
                        return (
                          <SelectImage
                            key={index}
                            urlImage={dataImage.uri}
                            onDeleteImage={handleDeleteImage}
                          />
                        )
                      })}

                    {(!value || value.length < 3) && (
                      <SelectImage onAddImage={handleAddImage} />
                    )}
                  </HStack>
                )}
              />
              <FormControl isInvalid={!!errors.images?.message}>
                <FormControl.ErrorMessage _text={{ color: 'error.600' }}>
                  {errors.images?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>

            <VStack space={4}>
              <Text fontFamily="heading" fontSize="md" color="gray.200">
                Sobre o produto
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    inputProps={{
                      placeholder: 'Título do anúncio',
                      value: value,
                      onChangeText: onChange
                    }}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    inputProps={{
                      placeholder: 'Descrição do Produto',
                      height: '160px',
                      textAlignVertical: 'top',
                      value: value,
                      onChangeText: onChange
                    }}
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="IsNewOrUsed"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <>
                    <Radio
                      radioGroupProps={{
                        name: 'radioCreateAdvertisement',
                        value: value?.toString(),
                        onChange: nextValue => {
                          onChange(nextValue)
                        }
                      }}
                      options={[
                        { value: 'new', text: 'Produto novo' },
                        { value: 'used', text: 'Produto usado' }
                      ]}
                      errorMessage={errors.IsNewOrUsed?.message}
                    />
                  </>
                )}
              />
            </VStack>

            <VStack space={4}>
              <Text fontFamily="heading" fontSize="md" color="gray.200">
                Venda
              </Text>

              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="price"
                    inputProps={{
                      placeholder: 'Valor do produto',
                      value: value ? value.toString() : '',
                      onChangeText: text => {
                        onChange(text === '' ? undefined : text)
                      }
                    }}
                    errorMessage={errors.price?.message}
                  />
                )}
              />

              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>

              <Controller
                control={control}
                name="acceptTrade"
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Switch
                    value={value}
                    onValueChange={() => onChange(!value)}
                  />
                )}
              />

              <VStack space={3}>
                <Text fontFamily="heading" fontSize="sm" color="gray.200">
                  Meios de pagamentos aceitos
                </Text>

                <VStack space={2}>
                  {paymentMethodsDB.map(paymentMethod => (
                    <Controller
                      key={paymentMethod.key}
                      control={control}
                      name="methodPayments"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          title={paymentMethod.name}
                          value={
                            !!value
                              ? value.filter(
                                  payment => payment.key === paymentMethod.key
                                ).length === 0
                                ? false
                                : true
                              : false
                          }
                          onValueChange={() =>
                            handleAddOrRemoveMethodPayment(
                              paymentMethod.key as PaymentMethodKeyProps,
                              paymentMethod.name
                            )
                          }
                        />
                      )}
                    />
                  ))}

                  <FormControl isInvalid={!!errors.methodPayments?.message}>
                    <FormControl.ErrorMessage _text={{ color: 'error.600' }}>
                      {errors.methodPayments?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
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
            onPress: handleSubmit(() => setPreview(true))
          }}
        />
      </HStack>
    </VStack>
  )
}
