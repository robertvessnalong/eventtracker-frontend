import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import { IoAirplane } from 'react-icons/io5';
import uuid from 'react-uuid';

const Favorites = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const setUserFavorites = () => {
      isLoading(false);
      setFavorites(user.favorites);
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
          <Card key={uuid()} className='Favortie'>
            <Card.Header>No. {favorite['flightNum'] ?? 'N/A'}</Card.Header>
            <Card.Body>
              <Card.Title>
                Flight Date: {favorite['flightDate'] ?? 'N/A'}
              </Card.Title>
              <Card.Text>
                Departure: {favorite['departureAirport'] ?? 'N/A'}
                <IoAirplane /> Arrival: {favorite['arrivalAirport'] ?? 'N/A'}
              </Card.Text>
              <Button variant='primary'>Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default Favorites;
