import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppBottomNavigatorRoutesProps } from '@routes/app.routes'

export function SignOut() {
  const { singOut } = useAuth()
  const navigation = useNavigation<AppBottomNavigatorRoutesProps>()

  useFocusEffect(
    useCallback(
      () =>
        Alert.alert('Deslogar', 'Deseja realmente sair da sua conta?', [
          {
            text: 'Sim',
            onPress: () => singOut()
          },
          {
            text: 'Não',
            style: 'cancel',
            onPress: () => navigation.navigate('home')
          }
        ]),
      []
    )
  )

  return <Loading />
}
