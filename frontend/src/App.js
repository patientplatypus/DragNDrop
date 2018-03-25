import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider }             from 'react-redux';
import thunk                    from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import  reducer                 from './redux/reducers';

import { createHashHistory } from 'history';

import Home from './components/screens/Home';
import Map from './components/screens/Map';
import Settings from './components/screens/Settings';

import './style/colors.css';
import './style/grid.css';


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{position: "absolute", width: "100%", height: "100%"}}>
          <Router>
            <div className = "namedGridHome">
              <div className = "barHome">
                <div className="backLightRed" style={{display: 'flex', height: "100%", width: "100%"}}>
                  <Link to="/" style={{textDecoration: "none"}}>
                    <div className="textBlue" style={{fontWeight: "bold"}}>
                      <p>
                        Home
                      </p>
                    </div>
                  </Link> &nbsp;
                  <Link to="/map" style={{textDecoration: "none"}}>
                    <div className="textBlue" style={{fontWeight: "bold"}}>
                      <p>
                        Map
                      </p>
                    </div>
                  </Link> &nbsp;
                  <Link to="/settings" style={{textDecoration: "none"}}>
                    <div className="textBlue" style={{fontWeight: "bold"}}>
                      <p>
                        Settings
                      </p>
                    </div>
                  </Link> &nbsp;
                </div>
              </div>

              <div className="headerHome">
                <div className="backDarkRed" style={{height: "100%", width:"100%", margin: "0"}}>
                  <br/>
                  <div>
                    <p>
                      Header is here yo!!!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mainHome backBlueGrey">
                <Route exact path='/' component={Home} />
                <Route path='/map' component={Map} />
                <Route path='/settings' component={Settings} />
              </div>

              <div className="footerHome">
                <div className="backBlue" style={{height: "100%", width:"100%", position: "absolute"}}>
                  <div style={{position: "relative", top:0}}>
                    <p>
                      Footer goes here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
