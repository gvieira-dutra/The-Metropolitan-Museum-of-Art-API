import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/my-app/lib/authenticate'
import { getFavourites, getHistory } from '@/my-app/lib/userData'
import { favouritesAtom, searchHistoryAtom } from '@/store'

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register']

export default function RouteGuard(props) {
  const router = useRouter()
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [authorized, setAuthorized] = useState(false)
  
  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistory(await getHistory())
  }

  useEffect(() => {
    updateAtoms()
    authCheck(router.pathname)

    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])
  function authCheck(url) {
    const path = url.split('?')[0]
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false)
      router.push('/login')
    } else {
      setAuthorized(true)
    }
  }
  return <>{props.children}</>
}
