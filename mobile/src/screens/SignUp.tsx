import { Platform, TouchableOpacity } from 'react-native'
import { User, PencilSimpleLine } from 'phosphor-react-native'

import {
  VStack,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Heading,
  useTheme
} from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProp } from '@routes/auth.router'

import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'

export function SignUp() {
  const { colors } = useTheme()

  const navigation = useNavigation<AuthNavigationRoutesProp>()

  function handleGoBack() {
    navigation.goBack()
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
              <VStack width={88}>
                <UserPhoto
                  size={88}
                  url="https://github.com/VagnerNerves.png"
                />
                <TouchableOpacity
                  style={{ position: 'absolute', bottom: 0, right: -10 }}
                >
                  <VStack
                    w={10}
                    h={10}
                    bg="blue.400"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PencilSimpleLine size={16} color={colors.gray[600]} />
                  </VStack>
                </TouchableOpacity>
              </VStack>

              <Input type="text" inputProps={{ placeholder: 'Nome' }} />
              <Input type="text" inputProps={{ placeholder: 'E-mail' }} />
              <Input type="text" inputProps={{ placeholder: 'Telefone' }} />
              <Input type="password" inputProps={{ placeholder: 'Senha' }} />
              <Input
                type="password"
                inputProps={{ placeholder: 'Confirmar senha' }}
              />
            </VStack>
            <Button title="Criar" typeColor="black" />
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
