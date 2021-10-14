import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';

const Login = () => {
  const history = useHistory();
  const { login } = useContext(UserContext);
  const formInitalState = {
    email: '',
    password: '',
  };
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
    const res = await login(formData);
    if (res.error) {
      setError(true);
      setErrorMsg(res.error);
    } else if (res.login) {
      setFormData(formInitalState);
      history.push('/profile');
    }
  };

  return (
    <>
      <div className='Login Center'>
        <Container>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{errorMsg}</Alert>}
            <Form.Group className='mb-3' controlId='loginEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={handleChange}
                name='email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='loginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handleChange}
                name='password'
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

export default Login;
