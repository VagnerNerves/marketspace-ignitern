import { ReactNode, createContext, useState } from 'react'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'

type MyTotProductsProps = {
  totProducts: number
  totProductsIsActive: number
  totProductsIsNotActive: number
}

type ProductContextDataProps = {
  myProducts: ProductDTO[]
  myTotProducts: MyTotProductsProps
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
  const [myTotProducts, setMyTotProducts] = useState<MyTotProductsProps>(
    {} as MyTotProductsProps
  )

  function totMyProducts(products: ProductDTO[]) {
    setMyTotProducts({
      totProducts: products.length,
      totProductsIsActive: products.filter(
        product => product.is_active === true
      ).length,
      totProductsIsNotActive: products.filter(
        product => product.is_active === false
      ).length
    })
  }

  async function getMyProducts() {
    try {
      const { data } = await api.get('/users/products')

      totMyProducts(data)
      setMyProducts(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <ProductContext.Provider
      value={{ myProducts, myTotProducts, getMyProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}
