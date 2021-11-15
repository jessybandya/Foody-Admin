import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import Loader from '../Loader';
import "./styles.css"
import {useHistory, useParams} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';

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
const Firstpage = () => {
  let {user} = useSelector((state)=> ({...state}));
  const history = useHistory()

  if(user){
      history.push("/home")
  }
  return (
    <motion.div className="home container"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    >
      <motion.h2 
      animate={{}}
      >
        <span style={{color: "#cc5500"}}>Welcome To Foody Admin</span>
      </motion.h2>
      <Link to="/signIn">
        <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        >
          Login As Admin
        </motion.button>
      </Link>
      <Loader/>

    </motion.div>
  )
}

export default Firstpage;