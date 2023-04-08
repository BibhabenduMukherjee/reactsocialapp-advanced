import { BrowserRouter as Routers ,Routes , Route } from "react-router-dom";

import { Contact, Feedbacks,  StarsCanvas } from "./components";
import Login from "./components/Login";
import HomeGround from "./components/HomeGround";
import Starter from "./components/Starter";
import { Provider } from 'react-redux'
import { store } from "../store";
import ProfileView from "./components/ProfileView";
const App = () => {
  return (
    <Provider store = {store}>
 <Routers>
   
   <div className='relative z-0 bg-primary'>
   
 

     <Routes>
      <Route exact path="/" element = {<Starter/>}></Route>
       <Route path="/postfeed" element = {<HomeGround/>}></Route>
       <Route path = "/login" element = {<Login/>}></Route>
       <Route path="/profile/:id"  element = {<ProfileView/>}></Route>
     </Routes>
   </div>
 </Routers>
    </Provider>
   
  );
}

export default App;
