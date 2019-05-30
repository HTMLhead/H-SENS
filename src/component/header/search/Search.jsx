import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Filter from './SelectBox';

const SearchWrapper = styled.div`
  display: flex;
  width: 60%;
  height: 60%;
  margin: auto;
  align-items: center;
`;
const SearchInputer = styled.input`
  padding: 0;
  border: 0;
  color: #011627;
  background-color: inherit;
  border-bottom: 1px solid #011627;
  outline: none;
  width: 65%;
  height: 100%;
  font-size: 1.6rem;
`;
const Line = styled.div`
  border-right: 1px solid #011627;
  height: 65%;
`;
const StyledSearchBtn = styled.button`
  display: flex;
  align-items: center;
  background: center url(${process.env.REACT_APP_CLIENT_URL}/image/searchBtnHover.png)
    no-repeat;
  width: 7%;
  height: 100%;
  color: #011627;
  border-bottom: 1px solid #011627;
  transition: background 0.3s;
  margin-right: 2.5%;
  border: 0;
  background-size: contain;
  &:hover {
    background: center url(${process.env.REACT_APP_CLIENT_URL}/image/searchBtn.png)
      no-repeat;
    background-size: contain;
    transition: background 0.3s;
  }
`;

const Search = ({ history }) => {
  const [value, setValue] = useState('');
  const [selector, setSelector] = useState('Works');
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${value}&select=${selector}`);
  };
  console.log(selector);
  return (
    <SearchWrapper>
      <SearchInputer
        placeholder="which? who?"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <StyledSearchBtn onClick={onSearchSubmit} />
      <Line />
      <Filter selector={selector} setSelector={setSelector} />
    </SearchWrapper>
  );
};
export default withRouter(Search);
