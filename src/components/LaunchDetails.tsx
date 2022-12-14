import styled, { css } from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import noImage from "../assets/no_image.jpg";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { removeLaunchFromListByIndex } from "../features/launchReducers";
import { GET_LAUNCH_DETAILS, SAVE_LAUNCH, GET_SAVED_LAUNCHES } from "../graphQL/querys"

const StyledContainer = styled.div`
  background-color: white;
  border: 1px solid var(--neutral-gray);
  border-radius: 8px;
  height: 74%;
  width: 100%;
`;

const StyledDetailsCard = styled.div`
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  margin: 1rem;
`;

const StyledImg = styled.img`
  width: 18rem;
  height: 18rem;
  padding: 0.5rem;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  padding: 0.5rem;
`;

const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;

const StyledLinks = styled.a`
  color: black;
  text-decoration: none;
  font-size: 18px;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CommonStyleButton = css`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.05em;
  margin-left: 1rem;
  padding: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledSavedBtn = styled.a`
  background-color: var(--background-save-button);
  ${CommonStyleButton}
`;

const StyledDeleteBtn = styled.a`
  background-color: var(--background-delete-button);
  ${CommonStyleButton}
`;

interface LaunchDetailsProps {
  id: string;
  setNextLaunch: (launch: string) => void;
}

const LaunchDetails = ({ id, setNextLaunch }: LaunchDetailsProps) => {

  const { loading, error, data } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { id },
  });

  const [saveLaunch] = useMutation(SAVE_LAUNCH, {
    variables: {},
    refetchQueries: [{ query: GET_SAVED_LAUNCHES }],
  });

  const state = useAppSelector((state) => state.launches);
  const dispatch = useDispatch();

  if (loading) return <StyledContainer>Loading...</StyledContainer>;
  if (error) return <StyledContainer>Error : {error.message}</StyledContainer>;

  const deleteLaunch = (id: string, setNextLaunch: any) => {
    const listSize = state.launchesList.length;
    const ids = state.launchesList.map((i) => i.id);
    const indexToDelete = ids.indexOf(id);

    dispatch(removeLaunchFromListByIndex(indexToDelete));

    if (listSize === 1) {
      setNextLaunch("");
    } else if (listSize - 1 === indexToDelete) {
      setNextLaunch(state.launchesList[0].id);
    } else {
      setNextLaunch(state.launchesList[indexToDelete + 1].id);
    }
  };

  const save = () => {
    saveLaunch({ variables: { id, missionName: data.launch.mission_name } });
  };

  return (
    <StyledContainer>
      {data.launch && (
        <StyledDetailsCard>
          <div style={{ display: "flex" }}>
            <StyledImg
              src={
                data.launch.links.flickr_images.length !== 0
                  ? data.launch.links.flickr_images[0]
                  : noImage
              }
            />
            <div>
              <h1 style={{ textAlign: "center", padding: ".5rem" }}>
                Mission {data.launch.mission_name}
              </h1>
              <StyledParagraph>
                Launch site: {data.launch.launch_site.site_name_long}
              </StyledParagraph>
              <StyledParagraph>
                Launch data: {data.launch.launch_date_local}
              </StyledParagraph>
              <StyledParagraph>
                Rocket name: {data.launch.rocket.rocket_name}
              </StyledParagraph>
              <StyledParagraph>
                Rocket type: {data.launch.rocket.rocket_type}
              </StyledParagraph>
              <StyledParagraph>
                Mission status:{" "}
                {data.launch.launch_success ? "Succeeded" : "Failed"}
              </StyledParagraph>
            </div>
          </div>
          <p style={{ padding: ".5rem", fontSize: "18px" }}>
            {data.launch.details}
          </p>
          <StyledButtonContainer>
            <div>
              {data.launch.links.article_link && (
                <StyledLinks
                  href={data.launch.links.article_link}
                  target="_blank"
                >
                  Article link
                </StyledLinks>
              )}
              {data.launch.links.video_link && (
                <StyledLinks
                  href={data.launch.links.video_link}
                  target="_blank"
                >
                  Video link
                </StyledLinks>
              )}
            </div>
            <div>
              <StyledSavedBtn onClick={() => save()}>Saved</StyledSavedBtn>
              <StyledDeleteBtn
                onClick={() => deleteLaunch(data.launch.id, setNextLaunch)}
              >
                Delete
              </StyledDeleteBtn>
            </div>
          </StyledButtonContainer>
        </StyledDetailsCard>
      )}
    </StyledContainer>
  );
};

export default LaunchDetails;
