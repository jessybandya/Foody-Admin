import React from "react"
import { motion, useCycle } from "framer-motion"
import "./load.css"
const loaderVariants = {
    animation1:{
        x: [-20, 20],
        y: [0, -30],
        transition:{
            x: {
                yoyo: Infinity,
                duration: 0.5
            },
            y: {
                yoyo: Infinity,
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    },
    animation2:{
        y: [0, -40],
        x: 0,
        transition:{
            y:{
                yoyo: Infinity,
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    }
}

const Loader = () =>{

    const [animation, cycleAnimation] = useCycle("animation1", "animation2");

    return(
        <>
        <motion.div className="loader"
        variants={loaderVariants}
        animate={animation}
        >

        </motion.div>
        <div onClick={()=> cycleAnimation()} style={{cursor: "pointer"}}>Where everything start from.</div>
        </>
    )
}

export default Loader;