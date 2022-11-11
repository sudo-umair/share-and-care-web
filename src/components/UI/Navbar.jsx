import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/icon.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeHospital } from '../../redux/hospital';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, name } = useSelector((state) => state.hospital);

  const handleSignout = () => {
    dispatch(removeHospital());
  };

  return (
    <Navbar bg='dark' variant='dark' sticky='top'>
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
            <NavDropdown title={`${name} `} id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/resources'>
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/volunteers'>
                Volunteers
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/account'>
                Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/' onClick={handleSignout}>
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
