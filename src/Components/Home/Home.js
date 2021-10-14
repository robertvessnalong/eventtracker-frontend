import {
  Form,
  Row,
  FloatingLabel,
  Col,
  Button,
  Container,
  Alert,
} from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { MdAirplanemodeActive } from 'react-icons/md';
import EventsFinderApi from '../../API/api';
import EventItem from '../Events/EventItem';
import uuid from 'react-uuid';
import UserContext from '../../Context/UserContext';

const Home = () => {
  const formInitalState = {
    search: '',
  };
  const { loggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState(formInitalState);
  const [events, setEvents] = useState([]);
  const [hasEvents, setHasEvents] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [fade, setFadeOut] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await EventsFinderApi.getEvents(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else {
      if (res.length > 0) {
        setFadeOut(true);
        setHasEvents(false);
        setFormData(formInitalState);
        setEvents(res.slice(0, 2));
      } else {
        setHasEvents(true);
      }
    }
  };

  return (
    <div className='Home Center'>
      <header className='center-content'>
        <h2>Events</h2>
        <span>Find Events Near You</span>
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
                  label='Search Events...'
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
                  Find Events
                </Button>{' '}
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <Container className='Event-Items-Home'>
        {hasEvents && (
          <Alert className='mt-4' variant='warning'>
            Sorry, no events found! Try Again
          </Alert>
        )}
        <Row xs={1} xl={2}>
          {events.map((event) => (
            <Col key={uuid()}>
              <EventItem event={event} />
            </Col>
          ))}
        </Row>
        <Row className={fade ? 'Sign-Up-Btn Active-Flex' : 'Sign-Up-Btn'}>
          <Col>
            {!loggedIn ? (
              <Link to='/login' className='blue-btn'>
                Sign Up To See More
              </Link>
            ) : (
              <Link to='/events' className='blue-btn'>
                See More
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
