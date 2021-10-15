import { useState, useEffect, useContext } from 'react';
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
import UserContext from '../../Context/UserContext';
import PerformerItem from './PerformerItem';
import EventsFinderApi from '../../API/api';
import uuid from 'react-uuid';

const Performers = () => {
  const formInitalState = {
    search: '',
  };
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(formInitalState);
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [hasPerformers, setHasPerformers] = useState(false);

  useEffect(() => {
    const getPerformers = async () => {
      const res = await EventsFinderApi.getPerformers({ page });
      setPerformers(res);
      setLoading(false);
    };
    getPerformers();
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
    const res = await EventsFinderApi.getPerformers(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else {
      if (performers.length > 0) {
        setHasPerformers(false);
        setFormData(formInitalState);
        setPerformers(res);
      } else {
        setHasPerformers(true);
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
    <div className='Performers'>
      <header>
        <h2>Performers</h2>
        <span>See Your Favorite Performers Show</span>
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
                  label='Search Performers...'
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
                  Find Performer
                </Button>{' '}
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <Row xs={1} lg={2} xl={3}>
        {performers.map((performer) => (
          <Col key={uuid()}>
            <PerformerItem performer={performer} favorites={user.favorites} />
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
    </div>
  );
};

export default Performers;
