import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import FlightHubApi from '../../API/api';
import AirportContainer from './Airport-Container';
import uuid from 'react-uuid';

import './Airport.css';

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getAirports = async () => {
  //     const res = await FlightHubApi.getAirports();
  //     console.log(res);
  //     setAirports(res.airports[0].data);
  //     setLoading(false);
  //   };

  //   getAirports();
  // }, []);

  return (
    <div className='Airports'>
      {/* <header>
        <h1>Airports</h1>
        <span>Learn More About Your Airport</span>
      </header>
      <Container>
        {airports.map((airport) => (
          <AirportContainer airportData={airport} key={uuid()} />
        ))}
      </Container> */}
    </div>
  );
};

export default Airports;
