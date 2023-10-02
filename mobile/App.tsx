import 'react-native-gesture-handler'

import { AuthContextProvider } from '@contexts/AuthContext'

import { LogBox, StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { Host } from 'react-native-portalize'

import { THEME } from '@theme/index'

import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts
} from '@expo-google-fonts/karla'

import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.'
  ])

  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Host>{fontsLoaded ? <Routes /> : <Loading />}</Host>
        </GestureHandlerRootView>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
