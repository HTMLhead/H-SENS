import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import PumpLoadingAni from '../authorization/PumpLoadingAni';
import MainLogo from './MainLogo';
import UserDropdown from './UserLinkBtn';
import Search from './search/Search';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #bbb;
  padding: 1%;
  height: 15vh;
  background-color: #ffffffcc;
`;

const HeaderLoadingAni = styled(PumpLoadingAni)`
  display: block;
  border: 1px solid #011627;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
`;

const QUERY = gql`
  {
    currentUser {
      userid
      userimage
    }
  }
`;

const Header = ({ isLoggedIn }) => {
  const { data, loading } = useQuery(QUERY);

  const logoutEvt = () => {
    window.localStorage.removeItem('token');
    window.location.replace(`${process.env.REACT_APP_CLIENT_URL}`);
  };

  if (!loading) {
    return (
      <HeaderContainer className="header">
        <MainLogo as={Link} to="/" />
        <Search />
        <UserDropdown
          icon={null}
          userimage={isLoggedIn ? data.currentUser.userimage : null}
        >
          {isLoggedIn ? (
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={isLoggedIn ? `/${data.currentUser.userid}` : '/signin'}
              >
                account
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutEvt}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/signin">
                Sign In
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </UserDropdown>
      </HeaderContainer>
    );
  }
  return (
    <HeaderContainer className="header">
      <MainLogo as={Link} to="/" />
      <Search />
      <HeaderLoadingAni />
    </HeaderContainer>
  );
};

export default Header;
