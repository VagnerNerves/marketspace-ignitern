import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  HStack,
  Center,
  useTheme
} from 'native-base'

import { WhatsappLogo } from 'phosphor-react-native'

const TYPE_COLOR = {
  black: 'gray.100',
  blue: 'blue.400',
  gray: 'gray.500'
} as const

const TYPE_COLOR_PRESSED = {
  black: 'gray.200',
  blue: 'blue.700',
  gray: 'gray.400'
} as const

interface ButtonProps {
  title: string
  typeColor: keyof typeof TYPE_COLOR
  buttonProps?: IButtonProps
}

export function Button({ title, typeColor, buttonProps }: ButtonProps) {
  const { colors } = useTheme()

  return (
    <ButtonNativeBase
      w="full"
      p={3}
      alignItems="center"
      justifyContent="center"
      rounded="6px"
      bg={TYPE_COLOR[typeColor]}
      _pressed={{
        bg: TYPE_COLOR_PRESSED[typeColor]
      }}
      leftIcon={
        <WhatsappLogo
          weight="fill"
          size={16}
          color={typeColor === 'gray' ? colors.gray[300] : colors.gray[600]}
        />
      }
      {...buttonProps}
    >
      <Text
        color={typeColor === 'gray' ? 'gray.200' : 'gray.700'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
