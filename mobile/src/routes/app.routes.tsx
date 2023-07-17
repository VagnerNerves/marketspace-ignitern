import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs'

import { House, Tag, SignOut as SignOutPhosphor } from 'phosphor-react-native'

import { useTheme } from 'native-base'

import { Home } from '@screens/Home'
import { MyAdvertisements } from '@screens/MyAdvertisements'
import { DetailsAdvertisement } from '@screens/DetailsAdvertisement'
import { CreateAdvertisement } from '@screens/CreateAdvertisement'
import { SignOut } from '@screens/SignOut'

type AppRoutes = {
  home: undefined
  myAdvertisements: undefined
  detailsAdvertisement: undefined
  createAdvertisement: undefined
  signOut: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          paddingTop: sizes[5],
          paddingBottom: sizes[7]
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <House
              weight={focused ? 'bold' : 'regular'}
              size={24}
              color={color}
            />
          ),
          tabBarHideOnKeyboard: true
        }}
      />
      <Screen
        name="myAdvertisements"
        component={MyAdvertisements}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Tag
              weight={focused ? 'bold' : 'regular'}
              size={24}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="detailsAdvertisement"
        component={DetailsAdvertisement}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="createAdvertisement"
        component={CreateAdvertisement}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: () => (
            <SignOutPhosphor
              weight="regular"
              size={24}
              color={colors.red[400]}
            />
          )
        }}
      />
    </Navigator>
  )
}
