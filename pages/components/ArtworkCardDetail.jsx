import React, { useState } from 'react'
import useSWR from 'swr'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Error from 'next/error'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { useEffect } from 'react'
import { addToFavourites, removeFromFavourites } from '@/my-app/lib/userData'

export default function ArtworkCardDetail({ objectID }) {
  //const objectID = prop.objectID

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [showAdded, setShowAdded] = useState(false)

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])
  console.log('here')
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  )

  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        setFavouritesList(await removeFromFavourites(objectID))
      } else {
        setFavouritesList(await addToFavourites(objectID))
      }
    } catch (err) {
      console.log('could not manipulate favourites info due => ', err)
    }
  }

  if (error) return <Error statusCode={404} />

  if (data) {
    return (
      <Card style={{ width: '100%' }}>
        {data?.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}

        <Card.Body>
          <Card.Title>{data?.title ? data.title : 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data?.objectDate ? data.objectDate : 'N/A'}
            <br />
            <strong>Classification: </strong>
            {data?.classification ? data.classification : 'N/A'}
            <br />
            <strong>Medium: </strong>
            {data?.medium ? data.medium : 'N/A'}

            <br />
            <br />
            <strong>Artist Name: </strong>
            {data?.artistDisplayName ? data.artistDisplayName : 'N/A'}
            <br />

            <strong>Credit Line: </strong>
            {data?.creditLine ? data.creditLine : 'N/A'}
            <br />

            <strong>Dimensions: </strong>
            {data?.dimensions ? data.dimensions : 'N/A'}
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="btn-container">
                {data?.artistDisplayName && (
                  <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                    Artist&apos;s wikipedia page
                  </a>
                )}
                <br />
                <br />
              </div>

              <div style={{ alignSelf: 'flex-start' }}>
                <Button
                  className="fav-btn"
                  variant={showAdded ? 'primary' : 'outline-primary'}
                  onClick={favouritesClicked}>
                  {showAdded ? '+ Favourites (added)' : '+ Favourites'}
                </Button>
                <br />
                <br />
                <Link href={`/artwork/${data.objectID}`} passHref>
                  <Button>
                    <strong>ID: </strong>
                    {data.objectID}
                  </Button>
                </Link>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  } else {
    return null
  }
}
