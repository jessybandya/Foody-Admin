import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
// import Loader from './Loader';
import { useHistory } from 'react-router';
import { auth,db } from '../../components/firebase';
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import "./login.css"


const buttonVariants = {


  hover:{
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition:{
      duration: 0.3,
      yoyo: Infinity
    }
  }
}

const containerVariants={
  hidden:{
    opacity: 0,
  },
  visible:{
    opacity:1,
    transition:{
      delay: 1.5,
      duration: 1.5
    }
  },
  exit:{
    x: '-100vw',
    transition:{
      ease: 'easeOut'
    }
  }
}
const Login = () => {
  const [email1, setEmail1] = useState("")
  const [rem,setRem] = useState("")
  let {user} = useSelector((state)=> ({...state}));

  const [email, setEmail] = useState('');
  const history = useHistory();
  const [password, setPassword] = useState('');
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  if(user !== null){
    history.push("/home")
  }

  const login = async(e)=> {
    e.preventDefault();
    setLoading(true)
      try{
        const result = await auth.signInWithEmailAndPassword(email, password)
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }
  
        });
        history.push('/home')
       }catch(error){
         toast.error(error.message)
         setLoading(false)
  
       }
 

  }

  return (
    <motion.div className="home container"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    >
      <motion.div 
      animate={{}}
      >
       <form style={{margin: "auto",padding: "15px",maxWidth: "400px",alignContent: "center"}}
>
                <div style={{textAlign: "center",marginBottom:15,color: "#8a2b06"}}>
            <label  htmlfor="name"><h4>ADMIN LOGIN</h4></label>
            </div>
            <TextField
          id="outlined-password-input"
          label="Admin Email"
          type="search"
          variant="filled"
          style={{width: "100%"}}
          onChange={(e) => {
            setEmail(e.target.value)
        }}
        />

            <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          style={{width: "100%",marginTop:15}}
          onChange={(e) => {
            setPassword(e.target.value)
        }}
        />

            <div onClick={login} style={{backgroundColor: "#8a2b06",color: "#fff", marginTop:10,height:35,padding:8,fontSize:18,fontWeight:700,borderRadius: 10,cursor: "pointer"}}>{loading ? <CircularProgress style={{height:35,width:35,color:"#fff"}}/> : <span>Sign In</span>}</div>
            {/* <input type="submit" value="Log In"/> */}
            </form>
      </motion.div>

      {/* <Loader/> */}
    </motion.div>
  )
}

export default Login;