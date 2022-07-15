import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "../routes/Coins";
import Coin from "../routes/Coin";
import History from "../routes/History";
import Price from "../routes/Price";



function Router() {
 return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Coins/>}/>
    <Route path="/:coinId" element={<Coin/>}>
        <Route path="history" element={<History/>}></Route>
        <Route path="price" element={<Price/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
 );
}

export default Router;