import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Card, Pagination, Row, Col } from 'react-bootstrap'
import ArtworkCard from '../components/ArtworkCard'
import Error from 'next/error'

const PER_PAGE = 12

export default function Home() {
  const [artworkList, setArtworkList] = useState()
  const [page, setPage] = useState(1)

  const router = useRouter()
  let finalQuery = router.asPath.split('?')[1]

  const fetcher = (url) => fetch(url).then((r) => r.json())

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  )

  function previousPage() {
    if (page > 1) setPage(page - 1)
  }

  function nextPage() {
    if (page < artworkList.length) setPage(page + 1)
  }

  useEffect(() => {
    if (data) {
      let results = []

      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE)
        results.push(chunk)
      }

      setArtworkList(results)

      setPage(1)
    }
  }, [data])

  if (error) return <Error statusCode={404} />

  if (artworkList) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((element) => (
              <Col lg={3} key={element}>
                <ArtworkCard objectID={element} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Body>
                <Card.Text>
                  <p>Try searching for something else</p>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Row>
        {artworkList.length > 0 && (
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item> {page} </Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        )}
      </>
    )
  } else {
    return null
  }
}
