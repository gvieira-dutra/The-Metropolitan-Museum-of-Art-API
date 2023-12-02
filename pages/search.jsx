import { useAtom } from 'jotai'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'

export default function Search() {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  let queryString = ''

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const submitForm = async (data) => {
    const { q, searchBy, geoLocation, medium, isHighlight, isOnView } = data

    queryString +=
      `${searchBy}=true` +
      (geoLocation ? `&geoLocation=${geoLocation}` : '') +
      (medium ? `&medium=${medium}` : '') +
      `&isOnView=${isOnView}` +
      `&isHighlight=${isHighlight}` +
      `&q=${q}`

    setSearchHistory(await addToHistory(queryString))

    route.push(`/artwork?${queryString}`)
  }
  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                {...register('q', { required: true })}
                className={errors.q && 'is-invalid'}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select name="searchBy" className="mb-3" {...register('searchBy')}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="geoLocation"
                {...register('geoLocation')}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;,
                &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by
                the pipe | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="" name="medium" {...register('medium')} />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;,
                &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                multiple values separated by the pipe | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register('isHighlight')}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register('isOnView')}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
