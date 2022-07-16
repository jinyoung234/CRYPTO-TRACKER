import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {fetchCoins} from "../utils/api";
import { Helmet } from "react-helmet-async";
import { isDarkAtom } from "../utils/atom";
import { useSetRecoilState } from "recoil";

const ChangeModeButton = styled.button`
  width: 20%;
  height: 5vh;
  background-color: rgba(0,0,0,0.1);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 0px solid white;
  border-radius: 10px;
  margin-bottom : 5%;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${props => props.theme.contentColor};
  color: ${(props) => props.theme.bgColor};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    text-decoration:none;
    color: ${(props) => props.theme.textColor};

  }
  p {
    padding-top:5px;
  }
  &:hover {
    a {  
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Content = styled.p`
`;

// Data로 들어오는 Coin들에 대한 interface (for state)
interface CoinInterface {
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string
}



function Coins () {
    // <useQuery>
    // first argument : queryKey
    // second argument : fetcher function
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
    
    // 상태를 변경 할 atom을 hook을 통해 설정
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    
    const modifyMode = () => setDarkAtom((prev) => !prev);
    return (
      <>
        <Helmet>
          {isLoading ?<title>isLoading...</title>: <title>JCoin</title> } 
        </Helmet>
        <Container>
          <Header>
            <Title>JCoin</Title>
          </Header>
          {isLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            <CoinsList>
              {data?.slice(0,20).map((coin) => (
                <Coin key={coin.id}>
                  <Link to={`/${coin.id}`} state={{name:coin.name, rank:coin.rank}}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>     
                    <Content>{coin.name}</Content>
                  </Link>
                </Coin>
              ))}
              <ChangeModeButton onClick={modifyMode}>Change mode</ChangeModeButton>
            </CoinsList>
          )}
          
        </Container> 
      </>
      );
}
export default Coins;