import React from 'react'
import Link from 'next/link'
import { Form, Button, Container, Nav, Navbar, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'

export default function MainNav() {
  const router = useRouter()
  const [searchField, setSearchField] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const onSubmit = (e) => {
    e.preventDefault()
    setSearchField('')
    setToggleFalse()
    setSearchHistory((current) => [...current, `?title=true&q=${searchField}`])
    router.push(`/artwork?title=true&q=${searchField}`)
  }

  const onInputChange = (e) => {
    setSearchField(e.target.value)
  }

  const changeToggleValue = () => {
    setIsExpanded(!isExpanded)
  }

  const setToggleFalse = () => {
    setIsExpanded(false)
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top"
        style={{ backgroundColor: '#4FB7ED' }} // Replace #3498db with your desired color
        expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Gleison Dutra</Navbar.Brand>
          <Navbar.Toggle onClick={changeToggleValue} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={setToggleFalse} active={router.pathname === '/'}>
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={setToggleFalse} active={router.pathname === '/search'}>
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={onSubmit}>
              <div className="button-container">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchField}
                    onChange={onInputChange}
                  />
                </Col>
              </div>

              <Col xs="auto">
                <Button  type="submit">Submit</Button>
              </Col>
            </Form>
            &nbsp;
            <Nav className="me-auto">
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={setToggleFalse}
                    active={router.pathname === '/favourites'}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={setToggleFalse}
                    active={router.pathname === '/history'}>
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
