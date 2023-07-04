import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'

import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts
} from '@expo-google-fonts/karla'

import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Loading /> : <Loading />}
    </NativeBaseProvider>
  )
}
