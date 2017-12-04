import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionData from './introspection.json';
import Home from './screens/Home';
import PeopleOverview from './screens/PeopleOverview';

const apiUri = 'http://localhost:3030';
const httpLink = new HttpLink({
  uri: apiUri,
  headers: {
    Accept: 'application/json',
  },		
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionData,
});

const memoryCache = new InMemoryCache({ fragmentMatcher });
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: memoryCache,
});

// Render the application.
ReactDOM.render((
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/people" component={PeopleOverview} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('root'));
