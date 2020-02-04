import React from 'react';
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Intro from './pages/Intro'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';


const Navigator = () => {
   return (
      <Router>
         <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
         >
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/intro" component={Intro} /> */}
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
         </AnimatedSwitch>
      </Router>
   )
};

export default Navigator;
