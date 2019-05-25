import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import SelectBox from '../../presenter/forms/SelectBox';
import SearchBtn from './SearchBtn';
import InputForm from '../../presenter/forms/Input';
import { MainContext } from '../../../context/mainContext';

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
  background: center url(./image/searchBtnHover.png) no-repeat;
  width: 10%;
  height: 100%;
  color: #011627;
  border-bottom: 1px solid #011627;
  transition: background 0.3s;
  margin-right: 2.5%;

  &:hover {
    background: center url(./image/searchBtn.png) no-repeat;
    transition: background 0.3s;
  }
`;

const Search = ({ history }) => {
  // const { handleInputChange } = useContext(MainContext);
  const [value, setValue] = useState('');
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${value}`);
  };
  return (
    <SearchWrapper>
      <SearchInputer
        placeholder="which? who?"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <StyledSearchBtn onClick={onSearchSubmit} />
      <Line />
      {/* <SelectBox /> */}
    </SearchWrapper>
  );
};
export default withRouter(Search);
