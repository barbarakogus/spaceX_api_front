import styled, { css } from "styled-components";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { removeFavoriteFromSavesList } from "../features/launchReducers";
import { useQuery, gql } from "@apollo/client";

const StyledContainer = styled.div`
  background-color: white;
  border: 1px solid var(--neutral-gray);
  border-radius: 8px;
  height: 22%;
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10;
  margin: 0 1rem;
`;

const StyledList = styled.ul`
  border: 1px solid var(--neutral-blue);
  border-radius: 8px;
  display: flex;
  margin: 0.5rem 0.5rem 0 0;

  &:hover {
    background-color: var(--neutral-blue);
  }
`;

const CommonStyleButton = css`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    background-color: var(--neutral-blue);
    color: white;
  }
`;

const StyledButton = styled.button`
  background-color: white;
  ${CommonStyleButton}
`;

const StyledDeleteBtn = styled.button`
  background-color: var(--background-delete-button);
  color: white;
  ${CommonStyleButton}
`;

const GET_SAVED_LAUNCHES = gql`
  query SavedLaunches {
    savedLaunches {
      id
      mission_name
    }
  }
`;

interface SavedLaunchesProps {
  onClick: (launchId: string) => void;
}

const SavedLaunches = ({ onClick }: SavedLaunchesProps) => {
  const state = useAppSelector((state) => state.launches);

  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_SAVED_LAUNCHES, {});

  console.log(data)

  return (
    <StyledContainer>
      <h3 style={{ margin: "1rem 0 0 1rem" }}>Saved launches</h3>
      <StyledDiv>
        {state.favoriteLaunches.map(
          ({ id, mission_name }: LaunchInformation) => (
            <StyledList key={id}>
              <li style={{ listStyleType: "none" }}>
                <StyledButton onClick={() => onClick(id)}>
                  {mission_name}
                </StyledButton>
              </li>
              <StyledDeleteBtn
                onClick={() => dispatch(removeFavoriteFromSavesList(id))}
              >
                x
              </StyledDeleteBtn>
            </StyledList>
          )
        )}
      </StyledDiv>
    </StyledContainer>
  );
};

export default SavedLaunches;
