import styled from '@emotion/native';

const CardContainer = styled.View`
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  margin: 15px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 8;
  width: 90%;
`;

const IconContainer = styled.View`
  align-items: center;
  margin-bottom: 15px;
`;

const Icon = styled.Text`
  font-size: 48px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  line-height: 24px;
`;

interface WelcomeCardProps {
  icon: string;
  title: string;
  description: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ icon, title, description }) => {
  return (
    <CardContainer>
      <IconContainer>
        <Icon>{icon}</Icon>
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
};