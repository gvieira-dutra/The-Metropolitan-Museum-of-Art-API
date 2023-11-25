import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import ArtworkCard from './components/ArtworkCard'
import { Row, Col, Card } from 'react-bootstrap'

export default function Favourites() {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  
  console.log('favoutrites list in FAV PAGE: ', favouritesList)


    return (
      <>
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            favouritesList.map((element) => (
              <Col lg={3} key={element}>
                <ArtworkCard objectID={element} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                <Card.Text as='div' >
                  <h4>No Favourites Yet</h4>
                  <p>Your favourite artwork will show here. Add some and come back to check them out.</p>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Row>
      </>
    )
  } 
  

