import { useState } from "react";
import styled from "styled-components";
import LatestLaunches from "../components/LatestLaunches";
import LaunchDetails from "../components/LaunchDetails";

const StyledMainContainer = styled.div`
    background-color: var(--light-gray);
    display: flex;
    height: 100vh;
    justify-content: space-evenly;
    padding: 1rem;
`



const Home = () => {

    const [launchSelected, setLaunchSelected] = useState("");

    return (
        <StyledMainContainer>
            <LatestLaunches onClick={(launch: string) => setLaunchSelected(launch)} launchSelected={launchSelected} />
            <LaunchDetails id={launchSelected} setNextLaunch={(launch: string) => setLaunchSelected(launch)} />
        </StyledMainContainer>
    )
}

export default Home;