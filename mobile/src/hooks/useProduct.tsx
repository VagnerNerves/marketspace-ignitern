import { useContext } from 'react'

import { ProductContext } from '@contexts/ProductContext'

export function useProduct() {
  const context = useContext(ProductContext)

  return context
}
