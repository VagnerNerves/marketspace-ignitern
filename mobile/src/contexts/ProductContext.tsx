import { ReactNode, createContext, useState } from 'react'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'

type ProductContextDataProps = {
  myProducts: ProductDTO[]
  getMyProducts: () => Promise<void>
}

export const ProductContext = createContext<ProductContextDataProps>(
  {} as ProductContextDataProps
)

type ProductContextProviderProps = {
  children: ReactNode
}

export function ProductContextProvider({
  children
}: ProductContextProviderProps) {
  const [myProducts, setMyProducts] = useState<ProductDTO[]>([] as ProductDTO[])

  async function getMyProducts() {
    try {
      const { data } = await api.get('/users/products')

      setMyProducts(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <ProductContext.Provider value={{ myProducts, getMyProducts }}>
      {children}
    </ProductContext.Provider>
  )
}
