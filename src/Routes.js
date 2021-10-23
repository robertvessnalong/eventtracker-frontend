import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Events from './Components/Events/Events';
import Performers from './Components/Performers/Performers';
import Profile from './Components/Profile/Profile';
import Venues from './Components/Venues/Venues';
import Social from './Components/Social/Social';
import PerformerPage from './Components/Performers/PerformerPage';
import ProtectedRoute from './Components/ProtectedRoute';

const Routes = () => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/events' component={Events} />
          <ProtectedRoute exact path='/social' component={Social} />
          <ProtectedRoute exact path='/performers' component={Performers} />
          <ProtectedRoute
            exact
            path='/performers/:id'
            component={PerformerPage}
          />
          <ProtectedRoute exact path='/venues' component={Venues} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </main>
    </>
  );
};

export default Routes;
