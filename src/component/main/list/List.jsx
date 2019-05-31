import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

import ListContainer from './ListContainer';
import fillArray from './fillArray';
import Line from './Line';
import MainLoadingAni from '../MainLoadingAni';

const NextButton = styled.button`
  position: absolute;
  top: 10%;
  left: 15%;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  background-color: ${props => (props.disabled ? 'red' : '#333')};
  border-radius: 50%;
  border: 1px solid #fff;
`;

const BefButton = styled.button`
  font-size: 1.5rem;
  position: absolute;
  top: 10%;
  left: 8%;
  width: 2rem;
  height: 2rem;
  background-color: ${props => (props.disabled ? 'red' : '#333')};
  border-radius: 50%;
  border: 1px solid #fff;
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
        ←
      </BefButton>
      <NextButton onClick={handleNextBtn} disabled={bLastPage ? 'disabled' : null}>
        →
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
