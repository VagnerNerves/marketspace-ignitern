import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  useTheme
} from 'native-base'

import {
  WhatsappLogo,
  Power,
  TrashSimple,
  ArrowLeft,
  Tag,
  Plus
} from 'phosphor-react-native'

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
  typeIcon?: 'whatsapp' | 'power' | 'trash' | 'arrowLeft' | 'tag' | 'plus'
  buttonProps?: IButtonProps
}

export function Button({
  title,
  typeColor,
  typeIcon,
  buttonProps
}: ButtonProps) {
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
        typeIcon ? (
          (() => {
            const colorIcon =
              typeColor === 'gray' ? colors.gray[300] : colors.gray[600]

            switch (typeIcon) {
              case 'whatsapp':
                return (
                  <WhatsappLogo weight="fill" size={16} color={colorIcon} />
                )

              case 'power':
                return <Power weight="regular" size={16} color={colorIcon} />

              case 'trash':
                return (
                  <TrashSimple weight="regular" size={16} color={colorIcon} />
                )

              case 'arrowLeft':
                return (
                  <ArrowLeft weight="regular" size={16} color={colorIcon} />
                )

              case 'tag':
                return <Tag weight="regular" size={16} color={colorIcon} />

              case 'plus':
                return <Plus weight="regular" size={16} color={colorIcon} />

              default:
                return <></>
            }
          })()
        ) : (
          <></>
        )
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
