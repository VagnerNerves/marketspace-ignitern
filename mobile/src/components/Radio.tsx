import { HStack, IRadioGroupProps, Radio as RadioNB } from 'native-base'

interface RadioProps {
  radioGroupProps: IRadioGroupProps
  options: {
    value: string
    text: string
  }[]
}

export function Radio({ radioGroupProps, options }: RadioProps) {
  return (
    <RadioNB.Group {...radioGroupProps}>
      <HStack space={5}>
        {options.map(option => {
          return (
            <RadioNB
              key={option.value}
              value={option.value}
              _checked={{
                borderColor: 'blue.400',
                _icon: { color: 'blue.400' }
              }}
              _pressed={{
                borderColor: 'blue.700',
                _icon: { color: 'blue.700' }
              }}
            >
              {option.text}
            </RadioNB>
          )
        })}
      </HStack>
    </RadioNB.Group>
  )
}
