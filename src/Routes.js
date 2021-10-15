import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Events from './Components/Events/Events';
import Performers from './Components/Performers/Performers';
import Profile from './Components/Profile/Profile';
import Airplane from './Components/Airplanes/Airplane';
import Social from './Components/Social/Social';
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
          <ProtectedRoute exact path='/airplanes' component={Airplane} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </main>
    </>
  );
};

export default Routes;
