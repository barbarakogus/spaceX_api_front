import styled from "styled-components";

interface StyledLaunchSelectedProps {
    selected: boolean;
}

const StyledCardContainer = styled.div<StyledLaunchSelectedProps>`
  border: 1px solid var(--neutral-gray);
  border-radius: 8px;
  cursor: pointer;
  margin: 1rem auto;
  padding: 0.3rem;
  text-align: center;
  width: 80%;

  &:hover {
    opacity: 0.7;
  }

  ${({ selected }) =>
        selected &&
        `
            background-color: var(--neutral-gray);
        `}
`;

const StyledParagraph = styled.p`
  font-size: 14px;

  &:nth-child(1) {
    font-weight: bold;
  }
`;

interface LaunchCardProps {
    id: string;
    missionName: string;
    launchDateLocal: Date;
    launchSite: LaunchSite;
    onClick: (id: string) => void;
    selected: boolean;
}

const LaunchCard = ({
    id,
    missionName,
    launchDateLocal,
    launchSite,
    onClick,
    selected,
}: LaunchCardProps) => {
    return (
        <StyledCardContainer onClick={() => onClick(id)} selected={selected}>
            <StyledParagraph>{missionName}</StyledParagraph>
            <StyledParagraph>{launchSite.site_name}</StyledParagraph>
            <StyledParagraph>{launchDateLocal.toString()}</StyledParagraph>
        </StyledCardContainer>
    );
};

export default LaunchCard;
