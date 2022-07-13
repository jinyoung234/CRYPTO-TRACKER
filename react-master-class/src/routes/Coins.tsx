import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    padding : 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items : center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
    background-color : white;
    color : ${props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom : 10px;
    a {
        padding: 20px;
        transition : color 0.2s ease-in;
        display: block;
        text-decoration: none;
        color: ${props => props.theme.textColor}
    }
    &:hover {
        a {
            color : ${props => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size : 40px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    font-size: 20px;
    text-align : center;
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
    // data로 들어오는 coin들을 위한 state 설정 (빈 배열 -> get data)
    const [coins, setCoins] = useState<CoinInterface[]>([]); 

    // loading state
    const [loadingState, setLoadingState] = useState(true);
    
    // API에서 Coin들을 받아오는 getCoins
    const getCoins = async () => {
        // 1. get data(axios.get)
        const res = await axios.get("https://api.coinpaprika.com/v1/coins");
        // 2. 받아온 데이터를 coins에 추가
        setCoins(res.data.slice(0,12));
    }
    
    // Dom에 처음 올라왓을 때 1번만 getCoins를 실행하기 위해 useEffect 사용
    useEffect(()=> {
        getCoins();
        // coin을 받고 나면 Loading state 변경
        setLoadingState(false);
    },[])

    return (
        <Container>
            <Header>
                <Title>Coins</Title> 
            </Header>
            {
               loadingState ? (<Loader>Loading...</Loader>) :  (
                <CoinsList>
                  {coins.map((coin) => (
                    <Coin key={coin.id}>
                      <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                    </Coin>
                  ))}
                </CoinsList>
              )
            }
            
        </Container>
    )
}
export default Coins;