import React from 'react'
import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Card, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import styles from '@/my-app/styles/History.module.css'

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const router = useRouter()

  let parsedHistory = []

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h)
    let entries = params.entries()
    parsedHistory.push(Object.fromEntries(entries))
  })

  const historyClicked = (e, index) => {
    e.preventDefault()
    router.push(`../artwork${searchHistory[index]}`)
  }

  const removeHistoryClicked = (e, index) => {
    e.preventDefault()

    e.stopPropagation() // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current]
      x.splice(index, 1)
      return x
    })
  }

  {
    if (parsedHistory.length > 0) {
      return (
        <>
          <ListGroup>
            {parsedHistory.map((myItem, index) => (
              <ListGroup.Item 
                className={styles.historyListItem}
                key={index}
                onClick={(e) => historyClicked(e, index)}>
                  <span>You searched: </span>
                {Object.keys(myItem).map((key) => (
                  <>
                    {key}: <strong>{myItem[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}>
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Text as="div">
              <h4>No Search History Yet</h4>
              <p>Your artwork search history will show here. Try searching for some artwork.</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }
}
