import { TouchableOpacity } from 'react-native'
import { HStack, IStackProps, Text, useTheme } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppBottomNavigatorRoutesProps } from '@routes/app.routes'

import { ArrowLeft, Plus, PencilSimpleLine } from 'phosphor-react-native'

interface HeaderNavigationProps {
  isGoBack?: boolean
  title?: string
  typeButton?: 'plus' | 'pencil'
  onPressButton?: () => void
  hStackProps?: IStackProps
}
export function HeaderNavigation({
  isGoBack,
  title,
  typeButton,
  onPressButton,
  hStackProps
}: HeaderNavigationProps) {
  const { sizes, colors } = useTheme()

  const navigation = useNavigation<AppBottomNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack alignItems="center" justifyContent="center" {...hStackProps}>
      {isGoBack && (
        <HStack position="absolute" left={0} {...hStackProps}>
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeft
              weight="regular"
              size={sizes[6]}
              color={colors.gray[100]}
            />
          </TouchableOpacity>
        </HStack>
      )}

      <Text fontFamily="heading" fontSize="xl" color="gray.100">
        {title}
      </Text>

      {typeButton && (
        <HStack position="absolute" right={0} {...hStackProps}>
          <TouchableOpacity onPress={onPressButton}>
            {typeButton === 'plus' && (
              <Plus weight="regular" size={sizes[6]} color={colors.gray[100]} />
            )}

            {typeButton === 'pencil' && (
              <PencilSimpleLine
                weight="regular"
                size={sizes[6]}
                color={colors.gray[100]}
              />
            )}
          </TouchableOpacity>
        </HStack>
      )}
    </HStack>
  )
}
