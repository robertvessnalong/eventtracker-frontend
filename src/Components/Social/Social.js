import { useState, useEffect } from 'react';
import { Container, Col, Row, Spinner, Alert } from 'react-bootstrap';
import EventsFinderApi from '../../API/api';
import SocialCard from './SocialCard';
import uuid from 'react-uuid';

const Social = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      const res = await EventsFinderApi.getComments();
      setLoading(false);
      setComments(res);
    };
    getComments();
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

  return (
    <div className='Social'>
      <header>
        <h1>Social</h1>
        <span>The Latest on Events</span>
      </header>
      <hr></hr>
      <Container>
        {comments.length < 1 && (
          <Alert className='mt-4' variant='warning'>
            Sorry, no comments found! Go make one!
          </Alert>
        )}
        <Row>
          {comments.map((comment, idx) =>
            idx % 2 === 0 ? (
              <Col key={uuid()} sm={{ span: 12 }} lg={{ span: 8, offset: 0 }}>
                <SocialCard comment={comment} />
              </Col>
            ) : (
              <Col key={uuid()} sm={{ span: 12 }} lg={{ span: 8, offset: 4 }}>
                <SocialCard comment={comment} />
              </Col>
            )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Social;
