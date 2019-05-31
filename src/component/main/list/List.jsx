import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

import ListContainer from './ListContainer';
import fillArray from './fillArray';
import Line from './Line';
import MainLoadingAni from '../MainLoadingAni';

const NextButton = styled.button`
  color: #fff;
  font-size: 9rem;
  position: absolute;
  top: 45%;
  right: 8%;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  z-index: 5;
  opacity: 0.1;
  &:hover {
    opacity: ${props => (props.disabled ? '0.1' : '0.6')};
  }
  border: none;
  outline: none;
`;

const BefButton = styled.button`
  color: #fff;
  font-size: 9rem;
  position: absolute;
  top: 45%;
  left: 1%;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  z-index: 5;
  opacity: 0.1;
  &:hover {
    opacity: ${props => (props.disabled ? '0.1' : '0.6')};
  }
  border: none;
  outline: none;
`;

const QUERY = gql`
  query seeWorks($index: Int!) {
    seeWorks(index: $index) {
      id
      worktitle
      workimage
    }
  }
`;

const List = () => {
  const [pagenation, setPaging] = useState(1);
  const [workLists, setList] = useState([]);
  const [bLastPage, setBLastPage] = useState(false);
  const { data, loading } = useQuery(QUERY, {
    variables: { index: pagenation },
  });
  const [scroll, setScroll] = useState('');

  useEffect(() => {
    if (loading) return;
    const works = data.seeWorks;
    !works[24] ? setBLastPage(true) : setBLastPage(false);
    setList(fillArray({ arr: works, num: 24, targetNum: 6 }));
  }, [data]);
  const handleNextBtn = async () => {
    setPaging(pagenation + 1);
  };
  const handleBefBtn = async () => {
    setPaging(pagenation - 1);
  };
  const multiScroll = e => {
    setScroll(e.target.scrollTop);
  };

  return loading ? (
    <MainLoadingAni />
  ) : (
    <>
      <BefButton onClick={handleBefBtn} disabled={pagenation <= 1 ? 'disabled' : null}>
        ◀︎
      </BefButton>
      <NextButton onClick={handleNextBtn} disabled={bLastPage ? 'disabled' : null}>
        ▶︎
      </NextButton>
      <ListContainer onScroll={multiScroll}>
        {workLists.length &&
          workLists.map((workList, i) => {
            const firstWorkId = workList[0].id;
            return <Line key={firstWorkId} works={workList} scroll={i % 2 && scroll} />;
          })}
      </ListContainer>
    </>
  );
};

export default List;
