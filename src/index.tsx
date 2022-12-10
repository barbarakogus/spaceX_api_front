import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

client
  .query({
    query: gql`
      query GetLocations {
        launches {
          id
          details
          launch_date_local
          launch_date_utc
          launch_site {
            site_name
            site_name_long
          }
          launch_success
          launch_year
          mission_name
          rocket {
            rocket_name
            rocket_type
          }
          links {
            flickr_images
            video_link
            article_link
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
