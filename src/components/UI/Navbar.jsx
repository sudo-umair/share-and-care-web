import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/icon.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeHospital } from '../../redux/hospital';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GLOBALS } from '../../utils/constants';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, name, email, token } = useSelector(
    (state) => state.hospital
  );

  const handleSignOut = async () => {
    dispatch(removeHospital());
    toast.success('Signed out successfully');
    await axios.post(`${GLOBALS.BASE_URL}/hospitals/signout`, {
      email,
      token,
    });
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <img
            alt=''
            src={Logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          <NavLink
            to={isLoggedIn ? '/home' : '/'}
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Share & Care
          </NavLink>
        </Navbar.Brand>
        <Navbar.Brand>
          {!isLoggedIn ? (
            <NavLink
              to={location.pathname === '/' ? '/sign-up' : '/'}
              style={{
                color: 'white',
                // textDecoration: 'none',
              }}
            >
              {location.pathname === '/' ? 'Sign Up' : 'Sign In'}
            </NavLink>
          ) : (
            <NavDropdown
              title={<Avatar name={name} title={name} size={30} round={true} />}
              menuVariant='dark'
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item as={Link} to='/resources'>
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/volunteers'>
                Volunteers
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/update-password'>
                Update Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/' onClick={handleSignOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;
