import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: #f0f8ff;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 30px;
`;

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px 30px;
  border-radius: 25px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const Card = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  margin: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 3;
  width: 90%;
`;

export default function App() {
  return (
    <Container>
      <Card>
        <Title>🏥 TeaChoco Hospital</Title>
        <Subtitle>ระบบจัดการโรงพยาบาลที่ทันสมัย</Subtitle>
        <Button onPress={() => console.log('Button pressed!')}>
          <ButtonText>เริ่มต้นใช้งาน</ButtonText>
        </Button>
      </Card>
      <StatusBar style="auto" />
    </Container>
  );
}
