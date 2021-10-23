import { Card, Button, Col, Row } from 'react-bootstrap';

const VenueItem = ({ venue }) => {
  return (
    <Card className='mt-4 mb-4 p-0'>
      <Card.Header as='h6'>
        <Row>
          <Col className='d-flex align-items-center' xs={10}>
            <small>{venue.name}</small>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} md={6} className='text-start'>
            <address>
              {venue.address}
              <br />
              {venue.extended_address}
            </address>
          </Col>
          <Col
            xs={12}
            md={6}
            className='d-flex align-items-center justify-content-end'
          >
            <a href={venue.url} rel='noreferrer' target='_blank'>
              <Button className='blue-btn' variant='primary'>
                Buy Tickets
              </Button>
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default VenueItem;
