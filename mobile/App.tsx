import { StatusBar, Text } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { Loading } from '@components/Loading'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  )
}
