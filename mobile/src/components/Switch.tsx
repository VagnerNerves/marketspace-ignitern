import { useState } from 'react'
import {
  Switch as SwitchReactNative,
  SwitchProps as SwitchPropsReactNative
} from 'react-native'

import { HStack, useTheme } from 'native-base'

interface SwitchProps extends SwitchPropsReactNative {}
export function Switch({ ...rest }: SwitchProps) {
  const { colors } = useTheme()

  return (
    <HStack>
      <SwitchReactNative
        trackColor={{ false: colors.gray[500], true: colors.blue[400] }}
        thumbColor={colors.gray[700]}
        {...rest}
      />
    </HStack>
  )
}
