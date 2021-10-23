import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import uuid from 'react-uuid';

const FavoriteEvent = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const setUserFavorites = () => {
      isLoading(false);
      const events = user.favorites.filter(({ type }) => type === 'event');
      setFavorites(events);
    };
    if (user.favorites) {
      setUserFavorites();
    }
  }, [user.favorites]);

  if (loading) {
    return (
      <Row>
        <Col>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  if (favorites.length < 1) {
    return (
      <Row>
        <Col>
          <span>You do not have any favorties yet!</span>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        {favorites.map((favorite) => (
          <Card key={uuid()} className='Favorite mb-4'>
            <Card.Header>{favorite.eventName}</Card.Header>
            <Card.Body>
              <Card.Text as='div'>
                <div className='card-time'>
                  <b>{favorite.eventDate}</b>
                </div>
                {favorite.eventAddress}
                <br />
                {favorite.eventExtendedAddress}
              </Card.Text>
              <a href={favorite.url} rel='noreferrer' target='_blank'>
                <Button className='blue-btn' variant='primary'>
                  Buy Tickets
                </Button>
              </a>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default FavoriteEvent;
