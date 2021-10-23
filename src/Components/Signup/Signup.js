import { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import UserContext from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const formInitalState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const history = useHistory();
  const { signUp, loggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState(formInitalState);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else if (res.login) {
      setFormData(formInitalState);
      history.push('/profile');
    }
  };

  if (loggedIn) {
    return <Redirect to='/profile'></Redirect>;
  }

  return (
    <>
      <div className='Login Center'>
        <Container>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{errorMsg}</Alert>}
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
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
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
            </Form.Group>
            <Button className='blue-btn' type='submit'>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Signup;
