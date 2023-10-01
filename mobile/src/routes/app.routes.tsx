import { useTheme } from 'native-base'

import { House, Tag, SignOut as SignOutPhosphor } from 'phosphor-react-native'

import { Home } from '@screens/Home'
import { MyAdvertisements } from '@screens/MyAdvertisements'
import { DetailsAdvertisement } from '@screens/DetailsAdvertisement'
import { DetailsMyAdvertisement } from '@screens/DetailsMyAdvertisement'
import { CreateAdvertisement } from '@screens/CreateAdvertisement'
import { SignOut } from '@screens/SignOut'

import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs'

import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'

type BottomRoutes = {
  home: undefined
  myAdvertisements: undefined
  signOut: undefined
}

type NativeStackRoutes = {
  homeBottom: BottomRoutes
  detailsAdvertisement: { id: string }
  detailsMyAdvertisement: { id: string }
  createAdvertisement: { id: string }
}

export type AppStackNavigatorRoutesProps =
  NativeStackNavigationProp<NativeStackRoutes>

export type AppBottomNavigatorRoutesProps =
  BottomTabNavigationProp<BottomRoutes>

const BottomTab = createBottomTabNavigator<BottomRoutes>()
const NativeStackTab = createNativeStackNavigator<NativeStackRoutes>()

function BottomTabHome() {
  const { colors, sizes } = useTheme()

  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen
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
      <BottomTab.Screen
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
      <BottomTab.Screen
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
    </BottomTab.Navigator>
  )
}

export function AppRoutes() {
  return (
    <NativeStackTab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NativeStackTab.Screen name="homeBottom" component={BottomTabHome} />
      <NativeStackTab.Screen
        name="detailsAdvertisement"
        component={DetailsAdvertisement}
      />
      <NativeStackTab.Screen
        name="detailsMyAdvertisement"
        component={DetailsMyAdvertisement}
      />
      <NativeStackTab.Screen
        name="createAdvertisement"
        component={CreateAdvertisement}
      />
    </NativeStackTab.Navigator>
  )
}
