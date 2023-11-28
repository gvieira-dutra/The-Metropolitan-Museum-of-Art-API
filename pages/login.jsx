import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { authenticateUser } from '@/my-app/lib/authenticate'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getToken } from '@/my-app/lib/authenticate'
import { useAtom } from 'jotai'
import { favouritesAtom, searchHistoryAtom } from '@/store'
import { getFavourites, getHistory } from '@/my-app/lib/userData'

//const fetcher = (url) =>
  //fetch(url, { headers: { Authorization: `JWT ${getToken()}` } }).then((res) => res.json())

export default function Login(props) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

  const router = useRouter()


  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistory(await getHistory())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await authenticateUser(user, password)
      await updateAtoms()
      router.push('/favourites')  
    } catch (err) {
      setWarning(err.message)
    }
  }

  //const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, fetcher)

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  )
}
