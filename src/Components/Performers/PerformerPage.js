import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import EventFinderApi from '../../API/api';
import EventItem from '../Events/EventItem';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import uuid from 'react-uuid';

const PerformerPage = () => {
  const { user, setUser, loggedIn } = useContext(UserContext);
  const [performer, setPerformer] = useState([]);
  const [performerEvents, setPerformerEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [hasEvents, setHasEvents] = useState(false);

  useEffect(() => {
    const getPerformer = async () => {
      const performerId = window.location.href.split('/').pop();
      const performer = await EventFinderApi.getPerformer({ performerId });
      const events = await EventFinderApi.getEvents({ search: performer.name });
      if (performer.error) {
        setError(true);
        setErrorMsg(performer.error);
      } else {
        if (events.length > 0) {
          setHasEvents(false);
          setPerformerEvents(events);
        } else {
          setHasEvents(true);
        }
      }
      setPerformer(performer);
      setLoading(false);
    };
    getPerformer();
  }, []);

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

  // Handle Favorties
  const handleFavorites = async (e, performer) => {
    const eventData = {
      type: 'performer',
      performerId: performer.id,
      performerName: performer.name,
      performerImage: performer.image,
      performerUrl: performer.url,
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

  return (
    <section className='PerformerPage'>
      <header>
        <h2>{error ? errorMsg : performer.name}</h2>
        {!error && (
          <>
            {loggedIn && (
              <>
                {EventFinderApi.favoriteCheck(user.favorites, performer) ? (
                  <div
                    className='favorite-btn favorited'
                    onClick={(e) => handleFavorites(e, performer)}
                  >
                    <AiFillHeart />
                  </div>
                ) : (
                  <div
                    className='favorite-btn'
                    onClick={(e) => handleFavorites(e, performer)}
                  >
                    <AiOutlineHeart />
                  </div>
                )}
              </>
            )}
          </>
        )}
        <hr></hr>
      </header>
      <Container className='Performer-Events'>
        {hasEvents && (
          <Alert className='mt-4' variant='warning'>
            Sorry, no events found! Try Again
          </Alert>
        )}
        <Row xs={1} xl={2}>
          {performerEvents.map((event) => (
            <Col key={uuid()}>
              <EventItem event={event} favorites={user.favorites} />
            </Col>
          ))}
        </Row>
      </Container>
      <footer>
        <Link className='blue-btn' to='/performers'>
          Go Back
        </Link>
      </footer>
    </section>
  );
};

export default PerformerPage;
