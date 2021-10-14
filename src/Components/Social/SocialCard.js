import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { IoAirplane } from 'react-icons/io5';
import FlightHubApi from '../../API/api';

const SocialCard = ({ comment }) => {
  return (
    <Card className='Favortie mb-4'>
      <Card.Header>
        {' '}
        {comment.departureAirport ?? 'N/A'}
        <IoAirplane /> {comment.arrivalAirport ?? 'N/A'}
      </Card.Header>
      <Card.Body>
        <Card.Title className='h3'>{comment.comment}</Card.Title>
        <Card.Text>
          - {comment.user.firstName} {comment.user.lastName}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>
        {FlightHubApi.FlightTimeConverter(comment.createdAt)}
      </Card.Footer>
    </Card>
  );
};

export default SocialCard;
