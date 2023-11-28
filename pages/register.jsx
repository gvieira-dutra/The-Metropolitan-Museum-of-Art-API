import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { registerUser } from '@/my-app/lib/authenticate'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getToken } from '@/my-app/lib/authenticate'

//const fetcher = (url) =>
  //fetch(url, { headers: { Authorization: `JWT ${getToken()}` } }).then((res) => res.json())

export default function Register(props) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [warning, setWarning] = useState('')

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await registerUser(user, password, password2)
      router.push({ pathname: "/login", query: { registered: true } }, "/login")
    } catch (err) {
      setWarning(err.message)
    }
  }

  //const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, fetcher)

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register a New User</h2>Enter your information below:
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
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
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
          Register
        </Button>
      </Form>
    </>
  )
}

//user: cleitinho pass: boa
