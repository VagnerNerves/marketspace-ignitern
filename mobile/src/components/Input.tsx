import { TouchableOpacity } from 'react-native'
import {
  Input as InputNativeBase,
  IInputProps,
  useTheme,
  Text,
  FormControl
} from 'native-base'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'

interface InputProps {
  type: 'text' | 'password' | 'price'
  inputProps?: IInputProps
  errorMessage?: string | null
}

export function Input({ type, inputProps, errorMessage = null }: InputProps) {
  const [viewPassword, setViewPassword] = useState(false)

  const invalid = !!errorMessage || inputProps?.isInvalid

  const { colors } = useTheme()

  return (
    <FormControl isInvalid={invalid}>
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
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'error.500'
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'gray.300'
        }}
        type={
          type === 'text' || type === 'price'
            ? 'text'
            : viewPassword
            ? 'text'
            : 'password'
        }
        keyboardType={type === 'price' ? 'numeric' : 'default'}
        InputLeftElement={
          type === 'price' ? (
            <Text
              fontFamily="body"
              fontSize="md"
              color="gray.100"
              marginLeft={4}
            >
              R$
            </Text>
          ) : (
            <></>
          )
        }
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

      <FormControl.ErrorMessage _text={{ color: 'error.600' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
