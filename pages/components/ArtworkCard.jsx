import React from 'react'
import useSWR from 'swr'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Image from 'next/image'
import Error from 'next/error'
import noImageAvailable from '@/image/noImageAvailable.png'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function ArtworkCard(prop) {

  const myID = prop.objectID
  const myUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + myID
  const { data, error } = useSWR( myUrl, fetcher)

  if (error) return <Error statusCode={404} />

  if (!data) {
    return null
  } else {
    return (
      <Card className='artwork-card' style={{ height: '100%' }}>
        {data?.primaryImageSmall ? (
          <Card.Img variant="top" src={data.primaryImageSmall} />
        ) : (
          <Image src={noImageAvailable} alt="No Image Available" layout="responsive" />
        )}

        <Card.Body style={{position: 'relative', bottom: '0'}} >
          
          {data?.title ? <Card.Title>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
          <Card.Text>
          
          <strong>Date: </strong> {data?.objectDate ? data.objectDate : 'N/A'} 
          <br/>
          <strong>Classification: </strong> {data?.classification ? data.classification : 'N/A'}
          <br/>
          <strong>Medium: </strong> {data?.medium ? data.medium : 'N/A'}
          <br/>
          </Card.Text>
          <div className='artwork-card-btn-container' >
            <Link href={`/artwork/${data.objectID}`} passHref>
          <Button className='artwork-card-btn'><strong>ID: </strong>{data.objectID}</Button>
            </Link>

          </div>
        </Card.Body>
      </Card>
    )                          
  }
}
