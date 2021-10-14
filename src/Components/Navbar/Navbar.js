import { useState, useContext, useEffect } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  FaRegCalendar,
  FaUserPlus,
  FaUserAlt,
  FaBuilding,
  FaMicrophone,
  FaUserCircle,
  FaComment,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from 'react-icons/fa';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user, logOut } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Object.keys(user).length === 0 ? setLoggedIn(false) : setLoggedIn(true);
  }, [user]);

  const menuHandler = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <>
      <div className={isActive ? `Navbar Mobile` : `Navbar`}>
        <ProSidebar collapsed={isActive}>
          <SidebarHeader>
            {!isActive && (
              <Link to='/'>
                <h1>Event Finder</h1>
              </Link>
            )}
            <div className='closemenu' onClick={menuHandler}>
              {/* changing menu collapse icon on click */}
              {isActive ? <FaArrowAltCircleRight /> : <FaArrowAltCircleLeft />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape='square'>
              {loggedIn && (
                <>
                  <MenuItem icon={<FaRegCalendar />}>
                    <NavLink to='/events'>Events</NavLink>
                  </MenuItem>
                  <MenuItem icon={<FaMicrophone />}>
                    <NavLink to='/performers'>Performers</NavLink>
                  </MenuItem>
                  <MenuItem icon={<FaBuilding />}>
                    <NavLink to='/venues'>Venues</NavLink>
                  </MenuItem>
                  <MenuItem icon={<FaComment />}>
                    <NavLink to='/social'>Social</NavLink>
                  </MenuItem>
                  <MenuItem icon={<FaUserCircle />}>
                    <NavLink to='/profile'>Profile</NavLink>
                  </MenuItem>
                </>
              )}
              {!loggedIn && (
                <>
                  <MenuItem icon={<FaUserPlus />}>
                    <NavLink to='/signup'>Sign Up</NavLink>
                  </MenuItem>
                  <MenuItem icon={<FaUserAlt />}>
                    <NavLink to='/login'>Log In</NavLink>
                  </MenuItem>
                </>
              )}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            {loggedIn && (
              <Menu iconShape='square'>
                <MenuItem>
                  <NavLink onClick={logOut} to='/'>
                    Log Out
                  </NavLink>
                </MenuItem>
              </Menu>
            )}
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Navbar;
