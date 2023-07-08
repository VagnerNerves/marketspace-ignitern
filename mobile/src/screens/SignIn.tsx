import { Platform } from 'react-native'
import { VStack, Text, ScrollView, KeyboardAvoidingView } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import MarketSpaceSvg from '@assets/marketspace.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
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

              <Input type="text" inputProps={{ placeholder: 'E-mail' }} />

              <Input type="password" inputProps={{ placeholder: 'Senha' }} />
            </VStack>

            <Button title="Entrar" typeColor="blue" />
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

            <Button title="Criar uma conta" typeColor="gray" />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
