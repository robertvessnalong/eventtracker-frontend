import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  FloatingLabel,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import EventFinderApi from '../../API/api';
import VenueItem from './VenueItem';
import uuid from 'react-uuid';

const Venues = () => {
  const formInitalState = {
    search: '',
  };
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(formInitalState);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [hasVenues, setHasVenues] = useState(false);

  useEffect(() => {
    const getVenues = async () => {
      const res = await EventFinderApi.getVenues({ page });
      setVenues(res);
      setLoading(false);
    };

    getVenues();
  }, [page]);

  if (loading) {
    return (
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await EventFinderApi.getVenues(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else {
      if (venues.length > 0) {
        setHasVenues(false);
        setFormData(formInitalState);
        setVenues(res);
      } else {
        setHasVenues(true);
      }
    }
  };

  const handlePagination = (e) => {
    if (e.target.classList.contains('btn')) {
      const attr = e.target.getAttribute('aria-label');
      if (attr === 'Previous' && page !== 1) {
        setPage((prevState) => prevState - 1);
      } else if (attr === 'Next' && page >= 1) {
        setPage((prevState) => prevState + 1);
      }
    }
  };

  return (
    <div className='Venues'>
      <header>
        <h2>Venues</h2>
        <span>Find A Venue Near You</span>
        <hr></hr>
      </header>
      <Container>
        <div className='Search'>
          <Form onSubmit={handleSubmit} className='mt-4'>
            {error && <Alert variant='danger'>{errorMsg}</Alert>}
            <Row className='g-2'>
              <Col md>
                <FloatingLabel
                  controlId='floatingInputGrid'
                  label='Search Venues...'
                >
                  <Form.Control
                    type='text'
                    name='search'
                    value={formData.search}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col md={3}>
                <Button
                  type='submit'
                  className='h-100 w-100 blue-btn'
                  variant='primary'
                >
                  Find Venue
                </Button>{' '}
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <Container className='Event-Items'>
        {hasVenues && (
          <Alert className='mt-4' variant='warning'>
            Sorry, no events found! Try Again
          </Alert>
        )}
        <Row xs={1} xl={2}>
          {venues.map((venue) => (
            <Col key={uuid()}>
              <VenueItem venue={venue} />
            </Col>
          ))}
        </Row>
        <Row className='mt-5'>
          <Col>
            <div aria-label='pagination'>
              <ul
                className='pagination justify-content-center'
                key={uuid()}
                onClick={handlePagination}
              >
                <Button
                  disabled={page === 1 ? true : false}
                  className='page-link'
                  href='#'
                  aria-label='Previous'
                  key={uuid()}
                >
                  <span className='page-arrow' aria-hidden='true'>
                    &laquo;
                  </span>
                </Button>
                <Button
                  className='page-link'
                  href='#'
                  aria-label='Next'
                  key={uuid()}
                >
                  <span className='page-arrow' aria-hidden='true'>
                    &raquo;
                  </span>
                </Button>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Venues;
