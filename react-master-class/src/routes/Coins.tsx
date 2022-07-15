import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {fetchCoins} from "../utils/api";
import { Helmet } from "react-helmet-async";

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
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    text-decoration:none;
    color: ${(props) => props.theme.bgColor};

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
            </CoinsList>
          )}
        </Container> 
      </>
      );
}
export default Coins;