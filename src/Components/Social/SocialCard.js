import { Card } from 'react-bootstrap';

const SocialCard = ({ comment }) => {
  return (
    <Card className='Favortie mb-4'>
      <Card.Header>{comment.eventName}</Card.Header>
      <Card.Body>
        <blockquote className='blockquote'>
          <p className='mb-0 h6'>{comment.comment}</p>
          <footer className='blockquote-footer mt-1'>{comment.userName}</footer>
        </blockquote>
      </Card.Body>
      <Card.Footer className='text-muted'>
        {comment.createdAt.slice(0, 10)}
      </Card.Footer>
    </Card>
  );
};

export default SocialCard;
