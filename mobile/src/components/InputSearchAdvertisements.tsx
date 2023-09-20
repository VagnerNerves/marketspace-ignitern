import { TouchableOpacity } from 'react-native'
import { MagnifyingGlass, Sliders } from 'phosphor-react-native'

import {
  Divider,
  HStack,
  Input as InputNativeBase,
  IInputProps,
  useTheme
} from 'native-base'

interface InputSearchAdvertisementsProps {
  getAdvertisements: () => void
  openModalFilter: () => void
  inputProps: IInputProps
}

export function InputSearchAdvertisements({
  getAdvertisements,
  openModalFilter,
  inputProps
}: InputSearchAdvertisementsProps) {
  const { colors } = useTheme()

  return (
    <InputNativeBase
      bg="gray.700"
      paddingLeft={4}
      paddingRight="0px"
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
      type="text"
      InputRightElement={
        <HStack space={3} marginLeft={3} marginRight={4} alignItems="center">
          <TouchableOpacity onPress={getAdvertisements}>
            <MagnifyingGlass weight="bold" size={20} color={colors.gray[200]} />
          </TouchableOpacity>
          <Divider bg="gray.400" w="1px" h="18px" orientation="vertical" />
          <TouchableOpacity onPress={openModalFilter}>
            <Sliders weight="bold" size={20} color={colors.gray[200]} />
          </TouchableOpacity>
        </HStack>
      }
      placeholder="Buscar anúncio"
      {...inputProps}
    />
  )
}
