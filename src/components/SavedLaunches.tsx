import styled, { css } from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SAVED_LAUNCHES, DELETE_SAVED_LAUNCH } from "../graphQL/querys"

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

interface SavedLaunchesProps {
  onClick: (launchId: string) => void;
}

const SavedLaunches = ({ onClick }: SavedLaunchesProps) => {

  const { loading, error, data } = useQuery(GET_SAVED_LAUNCHES, {});

  const [DeleteSavedLaunch] = useMutation(DELETE_SAVED_LAUNCH, {
    variables: {},
    refetchQueries: [{ query: GET_SAVED_LAUNCHES }],
  });

  if (loading) return <StyledContainer>Loading...</StyledContainer>;
  if (error) return <StyledContainer>Error : {error.message}</StyledContainer>;

  const deleteLaunch = (id: string) => {
    DeleteSavedLaunch({ variables: { id } });
  }

  return (
    <StyledContainer>
      <h3 style={{ margin: "1rem 0 0 1rem" }}>Saved launches</h3>
      <StyledDiv>
        {data && data.savedLaunches && data.savedLaunches.map(
          ({ id, mission_name }: LaunchInformation) => (
            <StyledList key={id}>
              <li style={{ listStyleType: "none" }}>
                <StyledButton onClick={() => onClick(id)}>
                  {mission_name}
                </StyledButton>
              </li>
              <StyledDeleteBtn
                onClick={() => deleteLaunch(id)}
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
