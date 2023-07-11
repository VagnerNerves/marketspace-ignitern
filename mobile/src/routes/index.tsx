import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { Box, useTheme } from 'native-base'

import { AuthRoutes } from './auth.router'

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[600]

  return (
    <Box flex={1} bg="gray.600">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
