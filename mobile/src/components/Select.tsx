import { Select as SelectNB, VStack, ISelectProps } from 'native-base'

import { CaretDown, CaretUp } from 'phosphor-react-native'

interface SelectProps {
  items: {
    label: string
    value: string
  }[]
  selectProps?: ISelectProps
}

export function Select({ items, selectProps }: SelectProps) {
  return (
    <SelectNB
      // selectedValue={service}
      // onValueChange={item => setService(item)}
      minWidth="111px"
      paddingLeft={3}
      paddingRight={2}
      py={2}
      borderRadius="6px"
      borderColor="gray.500"
      fontFamily="body"
      fontSize="sm"
      color="gray.100"
      dropdownIcon={
        <VStack marginRight={3}>
          <CaretDown weight="regular" size={16} />
        </VStack>
      }
      dropdownOpenIcon={
        <VStack marginRight={3}>
          <CaretUp weight="regular" size={16} />
        </VStack>
      }
      _selectedItem={{
        fontFamily: 'body',
        fontSize: 'sm',
        color: 'blue.200',
        bgColor: 'gray.500'
      }}
      {...selectProps}
    >
      {items.map(item => (
        <SelectNB.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </SelectNB>
  )
}
