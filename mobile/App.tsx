import { StatusBar, Text } from 'react-native'
import { NativeBaseProvider } from 'native-base'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Text>Open up App.tsx to start working on your app!</Text>
    </NativeBaseProvider>
  )
}
