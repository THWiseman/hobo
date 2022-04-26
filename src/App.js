import './App.css';
import Nav from './components/nav'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SteamSearch from './screens/steam-search'
import SteamDetails from './screens/steam-details.js'
import LandingPage from './screens/landing-page.js'
import Profile from './screens/profile'
import Curators from './screens/curators'
import Signup from './screens/signup'
import Signin from './screens/signin'
import BrowseCollections from './screens/browse-collections'
import GameDetails from './screens/game-details'
import userReducer from "./reducers/users/user-reducer.js";
import UserDetails from './screens/user-details'
import CollectionDetails from "./screens/collection-details"
import {Provider} from "react-redux";
import {createStore} from "redux";

const userStore = createStore(userReducer);

function App() {
  return (
      <div>
          <Provider store={userStore}>
      <div className="container">
        <BrowserRouter>
          <div className="row">
            <div className="col-2 pt-4">
              <Nav/>
            </div>
            <div className="col-10 pt-4">
              <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path={"/userDetails/:userId"} element={<UserDetails/>}/>
                  <Route path={"/collection/:collectionId"} element={<CollectionDetails/>}/>
                  <Route path={"/collections"} element={<BrowseCollections/>}/>
                  <Route path={"/gameDetails/:appId"} element={<GameDetails/>}/>
                  <Route path={"/signin"} element={<Signin/>}/>
                  <Route path={"/signup"} element={<Signup/>}/>
                  <Route path={"/search/:query"} element={<SteamSearch/>}/>
                <Route path="/search" element={<SteamSearch/>}/>
                <Route path="/details" element={<SteamDetails/>}/>
                  <Route path={"/profile/:steamId"} element={<Profile/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/curators" element={<Curators/>}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
          </Provider>
      </div>
  );
}

export default App;
