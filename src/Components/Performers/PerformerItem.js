import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PerformerItem = ({ performer }) => {
  return (
    <Card className='mt-4 mb-4 p-0 text-white'>
      <Card.Img src={performer.images.huge} alt='Card image' />
      <Card.ImgOverlay className='center-content'>
        <Card.Title style={{ fontWeight: 'bolder' }} as='h2'>
          {performer.name}
        </Card.Title>
        <Col xs={12} md={6}>
          <Link to={`/performers/${performer.id}`} rel='noreferrer'>
            <Button className='blue-btn' variant='primary'>
              See Events
            </Button>
          </Link>
        </Col>
      </Card.ImgOverlay>
    </Card>
  );
};

export default PerformerItem;
