import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text, VStack, useTheme } from 'native-base'

import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

import { X } from 'phosphor-react-native'

import { Button } from './Button'
import { SelectTag } from './SelectTag'
import { Switch } from './Switch'
import { Checkbox } from './Checkbox'

interface ModalFilterAdvertisementsProps {
  modalizeRef: React.RefObject<Modalize>
}

export function ModalFilterAdvertisements({
  modalizeRef
}: ModalFilterAdvertisementsProps) {
  const [selectProductNew, setSelectProductNew] = useState(false)
  const [selectProductUsed, setSelectProductUsed] = useState(false)
  const [acceptExchange, setAcceptExchange] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(false)
  const [selectedPix, setSelectedPix] = useState(false)
  const [selectedCash, setSelectedCash] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] = useState(false)
  const [selectedBankDeposit, setSelectedBankDeposit] = useState(false)

  const { colors } = useTheme()

  function handleModalClose() {
    modalizeRef.current?.close()
  }

  function handleResetFilter() {
    setSelectProductNew(false)
    setSelectProductUsed(false)
    setAcceptExchange(false)
    setSelectedTicket(false)
    setSelectedPix(false)
    setSelectedCash(false)
    setSelectedCreditCard(false)
    setSelectedBankDeposit(false)
  }

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        modalStyle={{
          backgroundColor: colors.gray[600],
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24
        }}
        handlePosition="inside"
        handleStyle={{
          top: 12,
          width: 56,
          height: 4
        }}
      >
        <VStack paddingTop={12} paddingBottom={8} px={6}>
          <VStack marginBottom={16} space={6}>
            <HStack alignItems="center">
              <Text
                flex={1}
                fontFamily="heading"
                fontSize="xl"
                color="gray.100"
              >
                Filtrar anúncios
              </Text>
              <TouchableOpacity onPress={handleModalClose}>
                <X weight="regular" size={24} color={colors.gray[400]} />
              </TouchableOpacity>
            </HStack>

            <VStack space={3}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Condição
              </Text>

              <HStack space={2}>
                <SelectTag
                  title="NOVO"
                  value={selectProductNew}
                  onPress={() => setSelectProductNew(prevState => !prevState)}
                />
                <SelectTag
                  title="USADO"
                  value={selectProductUsed}
                  onPress={() => setSelectProductUsed(prevState => !prevState)}
                />
              </HStack>
            </VStack>

            <VStack space={3}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>

              <Switch
                value={acceptExchange}
                onValueChange={() => setAcceptExchange(prevState => !prevState)}
              />
            </VStack>

            <VStack space={3}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Meios de pagamentos aceitos
              </Text>

              <VStack space={2}>
                <Checkbox
                  title="Boleto"
                  value={selectedTicket}
                  onValueChange={() =>
                    setSelectedTicket(prevState => !prevState)
                  }
                />
                <Checkbox
                  title="Pix"
                  value={selectedPix}
                  onValueChange={() => setSelectedPix(prevState => !prevState)}
                />
                <Checkbox
                  title="Dinheiro"
                  value={selectedCash}
                  onValueChange={() => setSelectedCash(prevState => !prevState)}
                />

                <Checkbox
                  title="Cartão de Crédito"
                  value={selectedCreditCard}
                  onValueChange={() =>
                    setSelectedCreditCard(prevState => !prevState)
                  }
                />

                <Checkbox
                  title="Depósito Bancário"
                  value={selectedBankDeposit}
                  onValueChange={() =>
                    setSelectedBankDeposit(prevState => !prevState)
                  }
                />
              </VStack>
            </VStack>
          </VStack>

          <HStack space={3}>
            <Button
              title="Resetar filtros"
              typeColor="gray"
              buttonProps={{
                flex: 1,
                onPress: handleResetFilter
              }}
            />
            <Button
              title="Aplicar filtros"
              typeColor="black"
              buttonProps={{
                flex: 1
              }}
            />
          </HStack>
        </VStack>
      </Modalize>
    </Portal>
  )
}
