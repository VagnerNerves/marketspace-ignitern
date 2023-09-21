import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text, VStack, useTheme, useToast } from 'native-base'

import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

import { X } from 'phosphor-react-native'

import { Button } from './Button'
import { SelectTag } from './SelectTag'
import { Switch } from './Switch'
import { Checkbox } from './Checkbox'
import { useProduct } from '@hooks/useProduct'
import { paymentMethodsDB } from '@dtos/PaymentMethodDTO'
import { AppError } from '@utils/AppError'

interface ModalFilterAdvertisementsProps {
  modalizeRef: React.RefObject<Modalize>
}

export function ModalFilterAdvertisements({
  modalizeRef
}: ModalFilterAdvertisementsProps) {
  const { filteredProducts, setFilteredProducts, getProducts } = useProduct()

  const { colors } = useTheme()
  const toast = useToast()

  function handleModalClose() {
    modalizeRef.current?.close()
  }

  function handleResetFilter() {
    setFilteredProducts(prevState => ({
      ...prevState,
      isNew: false,
      isUsed: false,
      acceptTrade: false,
      paymentMethods: []
    }))
  }

  function togglePaymentMethod(key: string, name: string) {
    const { paymentMethods } = filteredProducts

    if (paymentMethods) {
      const updatePaymentMethods = paymentMethods.filter(
        method => method.key !== key
      )

      if (updatePaymentMethods.length === paymentMethods.length) {
        setFilteredProducts(prevState => ({
          ...prevState,
          paymentMethods: [...paymentMethods, { key, name }]
        }))
      } else {
        setFilteredProducts(prevState => ({
          ...prevState,
          paymentMethods: updatePaymentMethods
        }))
      }
    } else {
      setFilteredProducts(prevState => ({
        ...prevState,
        paymentMethods: [{ key, name }]
      }))
    }
  }

  async function handleGetProducts() {
    try {
      await getProducts()
      handleModalClose()
    } catch (error) {
      const isAppError = error instanceof AppError
      const messageError = isAppError
        ? error.message
        : 'Não foi possível filtrar os anúncios. Tente novamente mais tarde.'

      toast.show({
        title: messageError,
        placement: 'top',
        bgColor: 'error.600'
      })
    }
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
                  value={!!filteredProducts.isNew}
                  onPress={() =>
                    setFilteredProducts(prevState => ({
                      ...prevState,
                      isNew: !prevState.isNew
                    }))
                  }
                />
                <SelectTag
                  title="USADO"
                  value={!!filteredProducts.isUsed}
                  onPress={() =>
                    setFilteredProducts(prevState => ({
                      ...prevState,
                      isUsed: !prevState.isUsed
                    }))
                  }
                />
              </HStack>
            </VStack>

            <VStack space={3}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>

              <Switch
                value={!!filteredProducts.acceptTrade}
                onValueChange={() =>
                  setFilteredProducts(prevState => ({
                    ...prevState,
                    acceptTrade: !prevState.acceptTrade
                  }))
                }
              />
            </VStack>

            <VStack space={3}>
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Meios de pagamentos aceitos
              </Text>

              <VStack space={2}>
                {paymentMethodsDB.map(method => (
                  <Checkbox
                    key={method.key}
                    title={method.name}
                    value={
                      !!filteredProducts.paymentMethods?.find(value => {
                        return value.key === method.key
                      })
                    }
                    onValueChange={() =>
                      togglePaymentMethod(method.key, method.name)
                    }
                  />
                ))}
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
                flex: 1,
                onPress: handleGetProducts
              }}
            />
          </HStack>
        </VStack>
      </Modalize>
    </Portal>
  )
}
