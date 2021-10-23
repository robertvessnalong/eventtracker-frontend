import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { Row, Col, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

const FavoritePerformer = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const setUserFavorites = () => {
      isLoading(false);
      const performers = user.favorites.filter(
        ({ type }) => type === 'performer'
      );
      setFavorites(performers);
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
          <span>You do not have any favorite performers yet!</span>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        {favorites.map((favorite) => (
          <Card key={uuid()} className='Favorite mb-4'>
            <Card.Body className='d-flex flex-row justify-content-between align-items-center'>
              <Card.Text as='div'>{favorite.performerName}</Card.Text>
              <Link
                className='blue-btn d-inline'
                to={`/performers/${favorite.performerId}`}
              >
                See Events
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default FavoritePerformer;
