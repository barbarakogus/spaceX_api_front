import { gql } from "@apollo/client";

export const GET_LAST_10_LAUNCHES = gql`
  query GetLast10Launches($offset: Int) {
    launchesPast(limit: 10, offset: $offset) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
    }
  }
`;

export const GET_LAUNCH_DETAILS = gql`
  query GetLaunchDetails($id: ID!) {
    launch(id: $id) {
      id
      details
      launch_date_local
      launch_site {
        site_name_long
        site_name
      }
      launch_success
      launch_year
      links {
        article_link
        flickr_images
        video_link
      }
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

export const SAVE_LAUNCH = gql`
  mutation SaveLaunch($id: ID!, $missionName: String!) {
    savedLaunches(id: $id, mission_name: $missionName) {
      id
      mission_name
    }
  }
`;

export const GET_SAVED_LAUNCHES = gql`
  query SavedLaunches {
    savedLaunches {
      id
      mission_name
    }
  }
`;

export const DELETE_SAVED_LAUNCH = gql`
  mutation DeleteSavedLaunch($id: ID!) {
    deleteSavedLaunch(id: $id) {
      id
    }
  }
`;
