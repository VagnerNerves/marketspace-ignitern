import {
  FormControl,
  HStack,
  IRadioGroupProps,
  Radio as RadioNB
} from 'native-base'

interface RadioProps {
  radioGroupProps: IRadioGroupProps
  options: {
    value: string
    text: string
  }[]
  errorMessage?: string | null
}

export function Radio({
  radioGroupProps,
  options,
  errorMessage = null
}: RadioProps) {
  const invalid = !!errorMessage

  return (
    <>
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
      <FormControl isInvalid={invalid}>
        <FormControl.ErrorMessage _text={{ color: 'error.600' }}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </>
  )
}
