import { ReactNode, SetStateAction, createContext, useState } from 'react'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'
import { PaymentMethodDTO } from '@dtos/PaymentMethodDTO'

import { inputOnChangeUnformattedTextToNumber } from '@utils/validationAndFormattedNumberForReal'

type MyTotProductsProps = {
  totProducts: number
  totProductsIsActive: number
  totProductsIsNotActive: number
}

type FilterProductsProps = {
  searchNameProduct: string
  isNew: boolean
  isUsed: boolean
  acceptTrade: boolean
  paymentMethods: PaymentMethodDTO[]
}

type ProductContextDataProps = {
  myProducts: ProductDTO[]
  myTotProducts: MyTotProductsProps
  getMyProducts: () => Promise<void>
  isLoadingGetMyProducts: boolean

  products: ProductDTO[]
  getProducts: () => Promise<void>
  setFilteredProducts: (value: SetStateAction<FilterProductsProps>) => void
  filteredProducts: FilterProductsProps
  isLoadingGetProducts: boolean

  product: ProductDTO
  getProduct: (id: string) => Promise<ProductDTO>
  updateProductForActiveOrInactive: (
    id: string,
    isActive: boolean
  ) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
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

  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[])
  const [filteredProducts, setFilteredProducts] = useState<FilterProductsProps>(
    {} as FilterProductsProps
  )
  const [isLoadingGetProducts, setIsLoadingGetProducts] =
    useState<boolean>(true)

  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

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

      const productsData: ProductDTO[] = data

      const productsComplete: ProductDTO[] = productsData.map(product => {
        const newPrice = inputOnChangeUnformattedTextToNumber(
          product.price.toString()
        )

        return {
          ...product,
          price: newPrice ? newPrice : 0
        }
      })

      totalizedMyProducts(productsComplete)
      setMyProducts(productsComplete)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingGetMyProducts(false)
    }
  }

  async function getProducts() {
    try {
      setIsLoadingGetProducts(true)

      const parameterQuery =
        filteredProducts.searchNameProduct &&
        filteredProducts.searchNameProduct.trim() !== ''
          ? `query=${filteredProducts.searchNameProduct.trim()}&`
          : ''

      const isNew = !!filteredProducts.isNew
      const isUsed = !!filteredProducts.isUsed
      const isMarkedNewAndUsed = isNew === isUsed
      const parameterIsNew: string = isMarkedNewAndUsed
        ? ''
        : `is_new=${isNew ? true : false}&`

      const parameterAcceptTrade = !!filteredProducts.acceptTrade
        ? `accept_trade=true&`
        : ''

      const parameterPaymentMethods: string = filteredProducts.paymentMethods
        ? filteredProducts.paymentMethods.reduce((newValue, currentValue) => {
            newValue = newValue + `payment_methods=${currentValue.key}&`
            return newValue
          }, '')
        : ''

      const { data } = await api.get(
        `/products?${parameterQuery}${parameterIsNew}${parameterAcceptTrade}${parameterPaymentMethods}`
      )
      const productsData: ProductDTO[] = data

      const productsComplete: ProductDTO[] = productsData.map(value => {
        const newPrice = inputOnChangeUnformattedTextToNumber(
          value.price.toString()
        )

        return {
          ...value,
          price: newPrice ? newPrice : 0,
          is_active: true
        }
      })

      setProducts(productsComplete)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingGetProducts(false)
    }
  }

  async function getProduct(id: string) {
    try {
      const { data } = await api.get(`/products/${id}`)

      const productData: ProductDTO = {
        ...data,
        price: inputOnChangeUnformattedTextToNumber(data.price.toString())
      }

      setProduct(productData)

      return productData
    } catch (error) {
      throw error
    }
  }

  async function updateProductForActiveOrInactive(
    id: string,
    isActive: boolean
  ) {
    try {
      await api.patch(`/products/${id}`, {
        is_active: isActive
      })

      await getProduct(id)
    } catch (error) {
      throw error
    }
  }

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/${id}`)
    } catch (error) {
      throw error
    }
  }

  return (
    <ProductContext.Provider
      value={{
        myProducts,
        myTotProducts,
        getMyProducts,
        isLoadingGetMyProducts,

        products,
        getProducts,
        setFilteredProducts,
        filteredProducts,
        isLoadingGetProducts,

        product,
        getProduct,
        updateProductForActiveOrInactive,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
