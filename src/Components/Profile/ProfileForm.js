import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import FlightHubApi from '../../API/api';

const ProfileForm = () => {
  const { user, setUser } = useContext(UserContext);
  const formInitalState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
  };
  const [formData, setFormData] = useState(formInitalState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);

  useEffect(() => {
    if (user.firstName) {
      setLoading(false);
      setFormData(formInitalState);
    }

    if (error || success) {
      const errOrSuccess = error ? 'error' : 'success';
      let timerFunc = setTimeout(() => {
        if (errOrSuccess === 'error') {
          setError(false);
        } else {
          setSuccess(false);
        }
      }, 10000);
      return () => clearTimeout(timerFunc);
    }
  }, [error, success, user.firstName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await FlightHubApi.updateUser(user.uuid, formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else {
      const { firstName, lastName, email } = res.user;
      setUser(res.user);
      setSuccess(true);
      setSuccessMsg(res.success);
      setFormData({
        firstName,
        lastName,
        email,
        password: '',
      });
      setErrorMsg('');
      setError(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant='danger'>{errorMsg}</Alert>}
        {success && <Alert variant='success'>{successMsg}</Alert>}
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>Enter Your Password</Form.Text>
        </Form.Group>
        <Button className='blue-btn' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
