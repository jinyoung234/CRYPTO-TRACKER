import { useParams } from "react-router-dom";

function Coin() {
    const {coinId} = useParams();
    return (
        <div>
            <h1>Coin:{coinId}</h1>    
        </div>
    )
}

export default Coin;