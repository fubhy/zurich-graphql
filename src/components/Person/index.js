import './styles.css';
import React from 'react';
import gql from 'graphql-tag';

export const personFragment = gql`
  fragment PersonFragment on Person {
    name
  }
`;

export default (props) => (
  <div className="Person--Wrapper">{props.name}</div>
);
