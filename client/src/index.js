import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
  uri: 'https://hl-storefront-server.appspot.com/'
  // uri: 'http://localhost:4000'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
