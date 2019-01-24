import React, { Component } from "react";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter, Route, Switch } from "react-router-dom";
const client = new ApolloClient({
  uri: "https://demo-contact-app.herokuapp.com/graphql/graphql"
  // uri: "http://localhost:9000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      </ApolloProvider>
    );
  }
}

export default App;
