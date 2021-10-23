import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ProfileForm from './ProfileForm';
import FavoriteEvent from './FavoriteEvent';
import FavoritePerformer from './FavoritePerformer';

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
          <Tab eventKey='event' title='Events'>
            <FavoriteEvent />
          </Tab>
          <Tab eventKey='performer' title='Performer'>
            <FavoritePerformer />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Profile;
