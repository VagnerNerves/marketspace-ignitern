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
  isLoadingGetMyProducts: boolean
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
  const [isLoadingGetMyProducts, setIsLoadingGetMyProducts] =
    useState<boolean>(true)

  function totalizedMyProducts(products: ProductDTO[]) {
    const { totActive, totInactive } = products.reduce(
      (currentValue, value) => {
        value.is_active === true
          ? currentValue.totActive++
          : currentValue.totInactive++

        return currentValue
      },
      { totActive: 0, totInactive: 0 }
    )

    setMyTotProducts({
      totProducts: products.length,
      totProductsIsActive: totActive,
      totProductsIsNotActive: totInactive
    })
  }

  async function getMyProducts() {
    try {
      setIsLoadingGetMyProducts(true)

      const { data } = await api.get('/users/products')

      totalizedMyProducts(data)
      setMyProducts(data)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingGetMyProducts(false)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        myProducts,
        myTotProducts,
        getMyProducts,
        isLoadingGetMyProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
