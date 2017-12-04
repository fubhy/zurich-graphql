import './styles.css';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Person, { personFragment } from '../../components/Person';

const PeopleOverview = ({ people, more }) => (
  <div className="PeopleOverview--Wrapper">
    {people && people.map((item) => (
      <Person key={item.id} {...item} />
    ))}

    <button className="PeopleOverview--LoadMore" onClick={more}>
      Load more
    </button>
  </div>
);

const peopleOverviewQuery = gql`
  query PeopleOverview($cursor: String) {
    allPeople(after: $cursor, first: 5) {
      pageInfo {
        endCursor
      }

      people {
        id
        
        ... PersonFragment
      }
    }
  }

  ${personFragment}
`;

const withQuery = graphql(peopleOverviewQuery, {
  props: ({ data: { fetchMore, allPeople, loading } }) => ({
    loading,
    people: allPeople && allPeople.people,
    more: () => !loading && fetchMore({
      query: peopleOverviewQuery || [],
      variables: {
        cursor: allPeople && allPeople.pageInfo && allPeople.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => ({
        allPeople: {
          ...fetchMoreResult.allPeople,
          people: [
            ...previousResult.allPeople.people,
            ...fetchMoreResult.allPeople.people,
          ],
        },
      }),
    }),
  }),
});

export default withQuery(PeopleOverview);
