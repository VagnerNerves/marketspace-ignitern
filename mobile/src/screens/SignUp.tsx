import { Platform, TouchableOpacity } from 'react-native'

import { api } from '@services/api'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as ImagePicker from 'expo-image-picker'

import { PencilSimpleLine } from 'phosphor-react-native'

import {
  VStack,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Heading,
  useTheme,
  FormControl,
  useToast
} from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProp } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { useState } from 'react'
import {
  formattedTel,
  numberCleanTel,
  validateTel
} from '@utils/validationAndFormattedTel'
import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  urlImage: string
  name: string
  email: string
  tel: string
  password: string
  confirmPassword: string
}

const signUpSchema = yup.object({
  urlImage: yup.string().required('Infome a foto'),
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email.').email('Email Inválido.'),
  tel: yup
    .string()
    .required('Informe o telefone.')
    .test('Validar Telefone', 'Telefone Inválido.', value =>
      validateTel(value)
    ),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digítos.'),
  confirmPassword: yup
    .string()
    .required('Informe a senha')
    .transform(value => (!!value ? value : null))
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
    .when('password', {
      is: (Field: any) => Field && Field !== null,
      then: schema =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform(value => (!!value ? value : null))
    })
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageSelect, setImageSelect] = useState<ImagePicker.ImagePickerAsset>(
    {} as ImagePicker.ImagePickerAsset
  )

  const toast = useToast()
  const { signIn } = useAuth()

  const { colors } = useTheme()

  const navigation = useNavigation<AuthNavigationRoutesProp>()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp(dataForm: FormDataProps) {
    const { name, email, tel, password } = dataForm

    setIsLoading(true)

    try {
      const fileExtension = imageSelect.uri.split('.').pop()
      const fileName = imageSelect.uri.split('/').pop()

      const photoFile = {
        name: fileName,
        uri: imageSelect.uri,
        type: `${imageSelect.type}/${fileExtension}`
      } as any

      const userUploadForm = new FormData()
      userUploadForm.append('avatar', photoFile)

      userUploadForm.append('name', name)
      userUploadForm.append('email', email)
      userUploadForm.append('tel', tel)
      userUploadForm.append('password', password)

      const response = await api.post('/users', userUploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearchImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (!result.canceled) {
      setImageSelect(result.assets[0])

      return result.assets[0].uri
    }

    return ''
  }

  return (
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
        <VStack flex={1} py={9} px={12} bg="gray.600">
          <VStack alignItems="center" space={3} mb={8} w="full">
            <LogoSvg width="60" height="40" />

            <VStack alignItems="center" space={2}>
              <Heading fontFamily="heading" fontSize="xl" color="gray.100">
                Boas vindas!
              </Heading>
              <Text
                fontFamily="body"
                fontSize="sm"
                color="gray.200"
                textAlign="center"
              >
                Crie sua conta e use o espaço para comprar itens variados e
                vender seus produtos
              </Text>
            </VStack>
          </VStack>

          <VStack flex={1} space={6}>
            <VStack space={4} alignItems="center">
              <Controller
                control={control}
                name="urlImage"
                render={({ field: { onChange } }) => (
                  <FormControl
                    isInvalid={!!errors.urlImage?.message}
                    alignItems="center"
                  >
                    <VStack width={88}>
                      <UserPhoto
                        size={88}
                        borderWidth={3}
                        url={!!imageSelect.uri ? imageSelect.uri : undefined}
                      />
                      <TouchableOpacity
                        style={{ position: 'absolute', bottom: 0, right: -10 }}
                        onPress={async () => {
                          const urlImage = await handleSearchImage()
                          onChange(urlImage)
                        }}
                      >
                        <VStack
                          w={10}
                          h={10}
                          bg="blue.400"
                          rounded="full"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <PencilSimpleLine
                            size={16}
                            color={colors.gray[600]}
                          />
                        </VStack>
                      </TouchableOpacity>
                    </VStack>
                    <FormControl.ErrorMessage _text={{ color: 'error.600' }}>
                      {errors.urlImage?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    inputProps={{
                      placeholder: 'Nome',
                      onChangeText: onChange,
                      value: value
                    }}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    inputProps={{
                      placeholder: 'E-mail',
                      onChangeText: onChange,
                      value: value,
                      keyboardType: 'email-address'
                    }}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    inputProps={{
                      placeholder: 'Telefone',
                      onChangeText: text => {
                        const textNumberTel = numberCleanTel(text)

                        onChange(textNumberTel)
                      },
                      value: formattedTel(value),
                      keyboardType: 'phone-pad'
                    }}
                    errorMessage={errors.tel?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    inputProps={{
                      placeholder: 'Senha',
                      onChangeText: onChange,
                      value: value
                    }}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    inputProps={{
                      placeholder: 'Confirmar senha',
                      onChangeText: onChange,
                      value: value
                    }}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
            </VStack>
            <Button
              title="Criar"
              typeColor="black"
              buttonProps={{
                onPress: handleSubmit(handleSignUp),
                isLoading: isLoading
              }}
            />
          </VStack>

          <VStack paddingY="46px" space={4}>
            <Text
              textAlign="center"
              color="gray.200"
              fontFamily="body"
              fontSize="sm"
            >
              Já tem uma conta?
            </Text>

            <Button
              title="Ir para o login"
              typeColor="gray"
              buttonProps={{ onPress: handleGoBack }}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
