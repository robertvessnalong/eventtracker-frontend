import { Card, Button, Col } from 'react-bootstrap';

const PerformerItem = ({ performer }) => {
  return (
    <Card className='mt-4 mb-4 p-0 text-white'>
      <Card.Img src={performer.images.huge} alt='Card image' />
      <Card.ImgOverlay className='center-content'>
        <Card.Title style={{ fontWeight: 'bolder' }} as='h2'>
          {performer.name}
        </Card.Title>
        <Col xs={12} md={6}>
          <a href={performer.url} rel='noreferrer' target='_blank'>
            <Button className='blue-btn' variant='primary'>
              See Events
            </Button>
          </a>
        </Col>
      </Card.ImgOverlay>
    </Card>
  );
};

export default PerformerItem;
