import './App.css';
import Nav from './components/nav'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SteamSearch from './screens/steam-search'
import SteamDetails from './screens/steam-details.js'
import LandingPage from './screens/landing-page.js'
function App() {
  return (
      <div className="container">
        <BrowserRouter>
          <div className="row">
            <div className="col-2">
              <Nav/>
            </div>
            <div className="col-10">
              <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                <Route path="/search" element={<SteamSearch/>}/>
                <Route path="/details" element={<SteamDetails/>}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
