import { useState, useContext } from 'react';
import {
  Card,
  Button,
  Container,
  Col,
  Form,
  Row,
  Alert,
} from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import EventFinderApi from '../../API/api';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const EventItem = ({ favorites, event }) => {
  const { user, setUser, loggedIn } = useContext(UserContext);
  const formInitalState = {
    eventId: event.id,
    eventName: event.title,
    userName: user.firstName,
    comment: '',
    uuid: user['uuid'],
  };
  const [formData, setFormData] = useState(formInitalState);
  const [comment, setIsCommenting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  const handleCommentSection = () => {
    setIsCommenting(!comment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Handle Favorties
  const handleFavorites = async (e, event) => {
    const eventData = {
      type: 'event',
      eventId: event.id,
      eventName: event.title,
      eventDate: EventFinderApi.eventTimeConverter(event.datetime_utc),
      eventAddress: event.venue.address,
      eventExtendedAddress: event.venue.extended_address,
      eventUrl: event.url,
      uuid: user['uuid'],
    };
    const res = e.target.classList.contains('favorited')
      ? await EventFinderApi.removefavorite(eventData)
      : await EventFinderApi.favoriteEvent(eventData);
    if (res.error) {
      console.error(res.error);
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      const userData = await EventFinderApi.getUserInfo(user.user, user.token);
      setUser(userData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await EventFinderApi.addComment(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else if (res.comment) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userData = await EventFinderApi.getUserInfo(user.user, user.token);
      setFormData(formInitalState);
      setIsCommenting(!comment);
      setUser(userData);
    }
  };

  return (
    <Card className='mt-4 mb-4 p-0'>
      <Card.Header as='h6'>
        <Row>
          <Col className='d-flex align-items-center' xs={10}>
            <small>{event.title}</small>
          </Col>
          <Col xs={2}>
            {loggedIn && (
              <>
                {EventFinderApi.favoriteCheck(favorites, event) ? (
                  <div
                    className='favorite-btn favorited'
                    onClick={(e) => handleFavorites(e, event)}
                  >
                    <AiFillHeart />
                  </div>
                ) : (
                  <div
                    className='favorite-btn'
                    onClick={(e) => handleFavorites(e, event)}
                  >
                    <AiOutlineHeart />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} md={6} className='text-start'>
            <div className='card-time'>
              <b>{EventFinderApi.eventTimeConverter(event.datetime_utc)}</b>
            </div>
            <address>
              {event.venue.address}
              <br />
              {event.venue.extended_address}
            </address>
          </Col>
          <Col
            xs={12}
            md={6}
            className='d-flex align-items-center justify-content-end'
          >
            <a href={event.url} rel='noreferrer' target='_blank'>
              <Button className='blue-btn' variant='primary'>
                Buy Tickets
              </Button>
            </a>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='text-muted text-start'>
        <button onClick={handleCommentSection}>Comment</button>
        <Col className={comment ? `Comment Active` : `Comment`} xs={12}>
          <Container>
            {error && <Alert variant='danger'>{errorMsg}</Alert>}
            <h6>Comment On Event</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                as='textarea'
                placeholder='Leave a comment here'
                name='comment'
                style={{ height: '150px' }}
                value={formData.comment}
                onChange={handleChange}
              />
              <button type='Submit'>Submit</button>
            </Form>
          </Container>
        </Col>
      </Card.Footer>
    </Card>
  );
};

export default EventItem;
