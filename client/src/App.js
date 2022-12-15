// require react, apolly, memory cache
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

// set up context for if user is logged in, and router for page route loading
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import all pages to be loaded depending on route
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
// import components needed for base app
import Header from '/components/Header';

// set up main GraphQL API endpoing
const httpLink = createHttpLink({
  uri: '/graphql'
});

// set up middleware that attaches to JWT to every request as 'authorization' header
const authLink = setContext((_, { headers }) => {
  // grab authentication token from local storage if it already exists
  const token = localStorage.getItem('id_token');

  // return headers to the context so httpLink can use them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// set up apollo client, executed with authLink middleware, to make a request to GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// render out the actual application
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/me"
                element={<Profile />}
              />
              <Route
                path="/profiles/:username"
                element={<Profile />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
