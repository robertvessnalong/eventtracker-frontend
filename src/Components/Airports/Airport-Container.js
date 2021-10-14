import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import uuid from 'react-uuid';

const AirportContainer = ({ airportData }) => {
  return (
    <Card className='Airport-info'>
      <Card.Body>
        <Card.Title className='Airport-Title'>
          {airportData['airport_name']}
        </Card.Title>
        <hr></hr>
        <ListGroup className='Airport-Detail' variant='flush'>
          {Object.entries(airportData)
            .slice(3)
            .map(([key, value]) => (
              <ListGroup.Item key={uuid()}>
                <Row>
                  <Col className='AirportKey'>
                    <h6>{key.includes('_') ? key.replace(/_/g, ' ') : key}</h6>
                  </Col>
                  <Col className='AirportValue'>{value ? value : 'N/A'}</Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AirportContainer;
