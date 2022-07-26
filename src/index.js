import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {AUTH_TOKEN} from "./constants";

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a httpLink that will connect ApolloClient instance with the GraphQL API.
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

// Configure Apollo with the auth token:
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// Instantiate ApolloClient by passing in the httpLink and new instance of an InMemoryCache.
// The auth middleware will be invoked every time ApolloClient sends a request to the server.
// Apollo Links allow us to create middlewares that modify requests before they are sent to the server.
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


// Render the root component of the React app. The app is wrapped with the higher-order component ApolloProvider that
// gets passed the client as a prop
// <BrowserRouter> Wrap the app with BrowserRouter
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>,
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
