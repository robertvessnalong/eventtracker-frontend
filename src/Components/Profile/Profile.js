import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ProfileForm from './ProfileForm';
import Favorites from './Favorites';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='Profile'>
      <header>
        <h1>Welcome, {user['firstName']}</h1>
        <span>Profile Information</span>
      </header>
      <hr></hr>
      <Container>
        <Tabs defaultActiveKey='profile' id='' className='mb-3'>
          <Tab eventKey='profile' title='Profile'>
            <ProfileForm />
          </Tab>
          <Tab eventKey='favorites' title='Favorites'>
            <Favorites />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Profile;
