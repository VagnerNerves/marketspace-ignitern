import { TouchableOpacity } from 'react-native'
import {
  Input as InputNativeBase,
  IInputProps,
  useTheme,
  Center
} from 'native-base'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'

interface InputProps {
  type: 'text' | 'password'
  inputProps?: IInputProps
}

export function Input({ type, inputProps }: InputProps) {
  const [viewPassword, setViewPassword] = useState(false)
  const { colors } = useTheme()

  return (
    <InputNativeBase
      bg="gray.700"
      paddingLeft={4}
      paddingRight={type === 'text' ? 4 : 2}
      py={3}
      borderWidth={0}
      borderRadius="6px"
      fontFamily="body"
      fontSize="md"
      color="gray.200"
      placeholderTextColor="gray.400"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'gray.300'
      }}
      type={type === 'text' ? 'text' : viewPassword ? 'text' : 'password'}
      InputRightElement={
        type === 'password' ? (
          <TouchableOpacity
            onPress={() => setViewPassword(state => !state)}
            style={{ marginRight: 16 }}
          >
            {viewPassword ? (
              <EyeSlash size={20} color={colors.gray[300]} />
            ) : (
              <Eye size={20} color={colors.gray[300]} />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      {...inputProps}
    />
  )
}
