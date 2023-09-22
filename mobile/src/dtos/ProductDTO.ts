import { PaymentMethodDTO } from './PaymentMethodDTO'
import { ProductImageDTO } from './ProductImageDTO'
import { UserDTO } from './UserDTO'

export type ProductDTO = {
  id: string
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  is_active: boolean
  product_images: ProductImageDTO[]
  payment_methods: PaymentMethodDTO[]
  user: UserDTO
}
