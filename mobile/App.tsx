import { Text } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />

      <Text>Open up App.tsx to start working on your app!</Text>
    </NativeBaseProvider>
  )
}
