import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a httpLink that will connect ApolloClient instance with the GraphQL API.
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

// Instantiate ApolloClient by passing in the httpLink and new instance of an InMemoryCache.
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

// Render the root component of the react app. The app is wrapped with the higher-order component ApolloProvider that
// gets passed the client as a prop
root.render(
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
