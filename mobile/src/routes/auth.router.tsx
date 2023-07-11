import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'

import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthRoutes = {
  singIn: undefined
  singUp: undefined
}

export type AuthNavigationRoutesProp = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="singIn" component={SignIn} />
      <Screen name="singUp" component={SignUp} />
    </Navigator>
  )
}
