import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from './pages/Home';
import Firstpage from './pages/Firstpage';
import Login from './pages/Login';
import { motion } from "framer-motion"
import AddEdit from "./pages/AddEdit"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header"
import { auth } from "./components/firebase"
import { useDispatch,useSelector } from 'react-redux';
import React,{useState, useEffect} from 'react'

function App() {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  // const history = useHistory();

  const [open, setOpen] = React.useState(false);
  let {user} = useSelector((state)=> ({...state}));
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }

        })
      }
    });
    //cleanup
    return () => unsubscribe();
   }, [])
  return (
    <>
                <Header/>
                <ToastContainer position="top-center" />
    <div className="App">
     <Router>
       <Switch>
         <Route exact path="/" component={Firstpage} />
         <Route exact path="/signIn" component={Login} />
         <Route exact path="/home" component={Home} />
         <Route exact  path="/add" component={AddEdit} />
      <Route exact path="/update/:id" component={AddEdit} />
       </Switch>
     </Router>
    </div>
    </>
  );
}

export default App;
