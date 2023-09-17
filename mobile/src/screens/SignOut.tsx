import { useEffect } from 'react'

import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

export function SignOut() {
  const { singOut } = useAuth()

  useEffect(() => {
    singOut()
  }, [])

  return <Loading />
}
