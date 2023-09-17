import { Platform } from 'react-native'
import {
  VStack,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  useToast
} from 'native-base'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProp } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg'
import MarketSpaceSvg from '@assets/marketspace.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

type FormDataProps = {
  email: string
  password: string
}

const singInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('Email Inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digítos.')
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigationRoutesProp>()

  const toast = useToast()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(singInSchema)
  })

  function handleNewAccount() {
    navigation.navigate('singUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível entrar no momento. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    } finally {
      setIsLoading(false)
    }
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
        <VStack flex={1}>
          <VStack
            flex={1}
            paddingY="68px"
            paddingX={12}
            bg="gray.600"
            borderBottomRadius={24}
            alignItems="center"
            justifyContent="center"
          >
            <LogoSvg />
            <MarketSpaceSvg style={{ marginTop: 20, marginBottom: 2 }} />
            <Text color="gray.300" fontFamily="body" fontSize="sm" mb={16}>
              Seu espaço de compra e venda
            </Text>

            <VStack space="16px" width="100%" mb={8}>
              <Text
                color="gray.200"
                fontFamily="body"
                fontSize="sm"
                textAlign="center"
              >
                Acesse sua conta
              </Text>

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
            </VStack>

            <Button
              title="Entrar"
              typeColor="blue"
              buttonProps={{
                onPress: handleSubmit(handleSignIn),
                isLoading: isLoading
              }}
            />
          </VStack>
          <VStack paddingY="46px" paddingX={12} space={4}>
            <Text
              textAlign="center"
              color="gray.200"
              fontFamily="body"
              fontSize="sm"
            >
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar uma conta"
              typeColor="gray"
              buttonProps={{ onPress: handleNewAccount }}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
