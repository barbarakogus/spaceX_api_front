import React from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLaunches {
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
`;
interface LaunchSiteProps {
  site_name: string;
  site_name_long: string;
}

interface RocketProps {
  rocket_name: string;
  rocket_type: string;
}

interface LinksProps {
  flickr_images: string[];
  video_link: string;
  article_link: string;
}
interface LaunchesProps {
  id: string;
  details: string;
  launch_date_local: Date;
  launch_date_utc: Date;
  launch_site: LaunchSiteProps;
  launch_success: boolean;
  launch_year: string;
  mission_name: string;
  rocket: RocketProps;
  links: LinksProps
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.launches.map(
    ({ id, details, mission_name, launch_year }: LaunchesProps) => (
      <div key={id}>
        <h3>{details}</h3>
        <p>{mission_name}</p>
        <p>{launch_year}</p>
        <br />
      </div>
    )
  );
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <DisplayLocations />
    </div>
  );
}

export default App;
