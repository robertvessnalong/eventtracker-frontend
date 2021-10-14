import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import FlightHubApi from '../../API/api';
import { ReactComponent as AirplaneSVG } from './airplane.svg';
import './Airplane.css';
import Select from 'react-select';

const Airplane = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [select, isSelected] = useState(false);

  // useEffect(() => {
  //   const getFlights = async () => {
  //     const res = await FlightHubApi.getAirplanes();
  //     const data = res.airplanes[0].data;
  //     const newArray = data.map((airplane) => ({
  //       ...airplane,
  //       value: airplane['model_code'],
  //       label: airplane['model_code'],
  //     }));
  //     setAirplanes(newArray);
  //   };

  //   getFlights();
  // }, []);

  // const handleSelect = (option) => {
  //   isSelected(true);
  //   setSelected(option);
  // };

  return (
    <div className='Airplanes'>
      {/* <header>
        <h1>Airplanes</h1>
        <span>Learn More About An Airplane</span>
      </header>
      <hr></hr>
      <Container>
        <Select onChange={handleSelect} options={airplanes}></Select>
        <div className='Airplane-Info'>
          {select && (
            <div className='Plane-Header'>
              <Row>
                <Col md={12} xl={4}>
                  <div className='Plane-Owner'>
                    <h4>Plane Owner: {selected['plane_owner'] ?? 'N/A'}</h4>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-IATA'>
                    <span>IATA: {selected['iata_type'] ?? 'N/A'}</span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Production-Line'>
                    <span>
                      Production Line: {selected['production_line'] ?? 'N/A'}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={4}>
                  <div className='Plane-Series'>
                    <span>
                      Plane Series: {selected['plane_series'] ?? 'N/A'}
                    </span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-Model'>
                    <span>Model Name: {selected['model_name'] ?? 'N/A'}</span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div
                    className={
                      selected['plane_status'] === 'active'
                        ? `Plane-Status active-plane`
                        : `Plane-Status inactive-plane`
                    }
                  >
                    <span>{selected['plane_status'] ?? 'N/A'}</span>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          <div className='PlaneSVG'>
            <AirplaneSVG />
          </div>
          {select && (
            <div className='Plane-Footer'>
              <Row>
                <Col md={12} xl={4}>
                  <div className='Plane-Engine-Type'>
                    <h4>Engine Type: {selected['engines_type'] ?? 'N/A'}</h4>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-Engine-Count'>
                    <span>
                      Engine Count: {selected['engines_count'] ?? 'N/A'}
                    </span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-Age'>
                    <span>Plane Age: {selected['plane_age'] ?? 'N/A'}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={4}>
                  <div className='Plane-Registration'>
                    <span>
                      Registration Number:{' '}
                      {selected['registration_number'] ?? 'N/A'}
                    </span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-Model-Code'>
                    <span>Model Code: {selected['model_code'] ?? 'N/A'}</span>
                  </div>
                </Col>
                <Col md={12} xl={4}>
                  <div className='Plane-First'>
                    <span>
                      First Flight:{' '}
                      {FlightHubApi.FlightTimeConverter(
                        selected['first_flight_date'] ?? 'N/A'
                      )}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Container> */}
    </div>
  );
};

export default Airplane;
