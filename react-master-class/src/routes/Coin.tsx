import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinData, fetchPriceData } from "../utils/api";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  height: 40px;
`;

const Tab = styled.span<{isActive:boolean}>`
    display: flex;
    justify-content:center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    a {
        display:flex;
        justify-content:center;
        align-items:center;
        width: 100%;
        height: 100%;
        text-decoration:none;
        color: ${ props => props.isActive ? props.theme.accentColor : props.theme.textColor };
    }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
`

const HeaderButton = styled.header`
    width: 20%;
    height: 15vh;
    display: flex;
    align-items:center;
    justify-content:center;
`;

const BackButton = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    width: 60%;
    height: 46.4%;
    border-radius: 50%;
    a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items:center;
        justify-content:center;
        text-decoration : none;
        color:white;
    }
`;

const HeaderTitle = styled.header`
    width: 80%;
    height: 15vh;
    display: flex;
    align-items:center;
    justify-content:center;
    padding-right: 80px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

// definite Link state attr
interface RouterState {
    name: string,
}

// definite getCoinData 
interface CoinPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h:number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h:number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number; 
        }
    };
}

// definite getCoinData
interface CoinData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}


function Coin() {
    // getCoinData url value
    const coinId = useParams().coinId; 
    
    // state from Link state Attr
    const state = useLocation().state as RouterState;
    
    // use react-quary 
    const {isLoading:coinDataLoading, data:coinData} = useQuery<CoinData>(["coinInfo", coinId], () => fetchCoinData(coinId!));
    const {isLoading:priceDataLoading, data:priceData} 
    = useQuery<CoinPriceData>(["priceInfo", coinId], () => fetchPriceData(coinId!), {
        refetchInterval: 500,
    });

    // url match 위한 변수
    const PriceMatch = useMatch("/:coinId/price");
    const ChartMatch = useMatch("/:coinId/chart");
    
    // coinData가 로딩하는지 priceData가 로딩중인지 확인하기 위한 변수
    const loading = coinDataLoading || priceDataLoading;
    return (
        <>
            <Helmet>
                {loading ?<title>loading</title> : <title>{coinId}</title> }
            </Helmet>
            <Container>
                <HeaderContainer>
                    <HeaderButton>
                        <BackButton>
                            <Link to={`/`}>&larr;</Link>
                        </BackButton>
                    </HeaderButton>
                    <HeaderTitle>
                        <Title>
                            {state?.name ? state.name : loading ? "Loading..." : coinData?.name}
                        </Title>
                    </HeaderTitle> 
                </HeaderContainer>
            {loading ? (
            <Loader>Loading...</Loader>) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{coinData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${coinData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>{priceData?.quotes.USD.price.toFixed(1)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{coinData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={ChartMatch !== null}>
                            <Link to={`/${coinId}/history`}>History Chart</Link>
                        </Tab>
                        <Tab isActive={PriceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price Chart</Link>
                        </Tab>
                    </Tabs>
                    <Outlet context={`${coinId}`}></Outlet>
                </>
            )}
        </Container>
        </>
    )
}

export default Coin;