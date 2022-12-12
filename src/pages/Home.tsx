import { useState } from "react";
import styled from "styled-components";
import LatestLaunches from "../components/LatestLaunches";
import LaunchDetails from "../components/LaunchDetails";
import SavedLaunches from "../components/SavedLaunches";

const StyledMainContainer = styled.div`
  background-color: var(--light-gray);
  display: flex;
  height: 100vh;
  justify-content: space-evenly;
  padding: 1rem;
`;

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-between;
  margin: auto 0;
  width: 70%;
`;

const Home = () => {
    const [launchSelectedId, setLaunchSelectedId] = useState("");

    return (
        <StyledMainContainer>
            <LatestLaunches
                onClick={(launchId: string) => setLaunchSelectedId(launchId)}
                launchSelected={launchSelectedId}
            />
            <StyledDetailsContainer>
                <SavedLaunches
                    onClick={(launchId: string) => setLaunchSelectedId(launchId)}
                />
                <LaunchDetails
                    id={launchSelectedId}
                    setNextLaunch={(launch: string) => setLaunchSelectedId(launch)}
                />
            </StyledDetailsContainer>
        </StyledMainContainer>
    );
};

export default Home;
