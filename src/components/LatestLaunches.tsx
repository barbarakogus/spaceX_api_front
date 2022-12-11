import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LaunchCard from "./LaunchCard";
import { useAppSelector } from '../store';
import { useDispatch } from "react-redux";
import { setLaunchesList } from "../features/launchReducers";

const StyledContainer = styled.div`
  background-color: white;
  border: 1px solid var(--neutral-gray);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%;
  margin: auto 0;
  
  width: 20%;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  text-align: center;
  padding: 1rem 0 .5rem 0;
`;

const StyledDiv = styled.div`
  height: 90%;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledButton = styled.button`
  background-color: var(--neutral-coral);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  letter-spacing: 0.1em;
  margin: 0 auto 1rem auto ;
  padding: 0.7rem;
  width: 80%;

  &:hover {
    opacity: 0.7;
  }
`;

const GET_LAST_10_LAUNCHES = gql`
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

interface LatestLaunchesProps {
    onClick: (launch: string) => void;
    launchSelected: string
}

const LatestLaunches = ({ onClick, launchSelected }: LatestLaunchesProps) => {

    const [offset, setOffset] = useState(0);
    // const [launches, setLaunches] = useState<any>([]);

    const state = useAppSelector(state => state.launches)

    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(GET_LAST_10_LAUNCHES, {
        variables: { offset },
    });

    useEffect(() => {
        const newLaunches = [...state.launchesList];

        if (!data) return;
        if (data && data.loading) return;

        data.launchesPast.forEach((launch: Launch) => {
            newLaunches.push(launch);
        });

        dispatch(setLaunchesList(newLaunches))
    }, [data]);

    if (error) return <p>Error : {error.message}</p>;

    const loadMoreLaunches = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setOffset(offset + 10);
    };

    return (
        <StyledContainer>
            <StyledParagraph>Last 10 launches</StyledParagraph>
            <StyledDiv>
                {state.launchesList.map(
                    ({ id, mission_name, launch_date_local, launch_site }: Launch) => (
                        <LaunchCard
                            key={id}
                            id={id}
                            missionName={mission_name}
                            launchDateLocal={launch_date_local}
                            launchSite={launch_site}
                            onClick={onClick}
                            selected={id === launchSelected}
                        />
                    )
                )}
            </StyledDiv>
            <StyledButton onClick={(e) => loadMoreLaunches(e)}>
                Load 10 more
            </StyledButton>
        </StyledContainer>
    );
};

export default LatestLaunches;
