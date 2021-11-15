import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import { db,auth } from "../../firebase"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Grid} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { produce } from "immer"
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import { useHistory } from "react-router-dom"
import ShareIcon from '@mui/icons-material/Share';
import Backdrop from '@mui/material/Backdrop';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Posts({ postId,  ownerId, questions, timestamp,name,city,street,totalAmount,i}) {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    var quest = [];
    var post_answer = [];
    var history = useHistory()
  
     var [answer,setAnswer] = useState([])
    let {user} = useSelector((state)=> ({...state}));
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
      setOpen2(false);
    };
    const handleToggle = () => {
      setOpen2(true);
    };

  const [numberOfSurvey, setNumberOfSurvey] = React.useState(0)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false)
  const [questionOption, setQuestionOption] = useState("")


//     useEffect(() => {
//       db.collection('surveys').doc(postId).collection("responses").where("reply","==", true)
//      .onSnapshot(snapshot => (
//       setNumberOfSurvey(snapshot.docs.length)
//      ))
//   }, [numberOfSurvey]);


const onDelete = (id) =>{
    if(window.confirm("Are you sure you want to delete this order?")){
        db.child(`/orders/${id}`).remove((err) => {
            if(err){
                toast.error(err)
            }else{
               toast.success("Order deleted successfully") 
            }
        })
    }
}


function select(que,option){
  // answer.map((ele)=>{
  //     ele.question==que ? ele.answer = option : console.log(" ")
  // })

 var k =answer.findIndex((ele)=>(ele.question == que))

 answer[k].answer=option
  setAnswer(answer)
  console.log(answer)
}

useEffect(()=>{
questions.map((q)=>{
  answer.push({
    "question": q.questionText,
    "answer" : " "
  })
  
})
questions.map((q,qindex)=>{
   quest.push(    {"header": q.questionText, "key": q.questionText })
})
console.log(answer)




},[])

 var  post_answer_data = {}

 

//  const onQuestionOptionChange = (e) => {
//    console.log("Text: ",e.target.value)
//    setQuestionOption(e.target.value)
//  }
function selectinput(que,option){
  console.log("Value1: ",questionOption)

  var k =answer.findIndex((ele)=>(ele.question == que))

  answer[k].answer=questionOption
   setAnswer(answer)
 }


 function selectcheck(e,que,option){
   var d =[]
var k =answer.findIndex((ele)=>(ele.question == que))
if(answer[k].answer){
  d=answer[k].answer.split(", ")

}

if(e == true){
  d.push(option)
}
else{
  var n=d.findIndex((el)=>(el.option == option))
  d.splice(n,1)

}

 answer[k].answer=d.join(", ")

  setAnswer(answer)
  console.log(answer)
 }


 const addData1 = () =>{


   console.log("Data: ",answer)
 }

const submit =() =>{


 if(!lat && !lng){

   if (!navigator.geolocation) {
     setStatus('Geolocation is not supported by your browser');

   } else {
     setStatus('Locating...');
     navigator.geolocation.getCurrentPosition((position) => {
       setStatus(null);
       setLat(position.coords.latitude);
       setLng(position.coords.longitude);
     }, () => {
       setStatus('Unable to retrieve your location');
     });
   }
 }else{

 

 setLoading(true)

 db.collection('surveys').doc(postId).collection("responses").where("fromId", "==", auth.currentUser.uid).where("formId", "==",postId ).get().then(
   snap => {
     if (snap.docs.length > 0) {
       setLoading(false)
       toast.error("You have participated already!")
     }
     else {
         db.collection('surveys').doc(postId).collection("responses").add({
             //
           timestamp:  Date.now(),
           fromEmail: auth?.currentUser?.email,
           fromId:auth?.currentUser?.uid,
           questions1: answer,
               read: false,
               reply: true,
               formId: postId,
               ownerFormId: ownerId,
               lat,
               lng,
          
         }).then(ref =>{
           setLoading(false)
           toast.success("Thank you the response has been submitted successfully\nThe information provided shall be treated confidential")
         })
     }
   }
 )

}



}
const handleClickOpen1 = () => {
  setOpen1(true);
};

const handleClose1 = () => {
  setOpen1(false);
};






var d = timestamp;
//var d =val.timestamp;

//NB: use + before variable name
var date = new Date(+d)

     if(loading){
       return(

        <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
       
      >

        <DialogContent 
         style={{backgroundColor: "trasparency"}}          
dividers>
        <Typography gutterBottom >
        
<div style={{alignItems: "center",display: "flex"}}>
  <div><CircularProgress /></div>
  <div style={{marginLeft:10}}> Loading... </div>
</div>

    
        </Typography>
  

        </DialogContent>

      </BootstrapDialog>
        
       )
     }else{
      return (
        <>
              <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                     <span style={{fontWeight:"600"}}>{i + 1}.</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{city}</TableCell>
                  <TableCell align="right">{street}</TableCell>
                  <TableCell align="right">{totalAmount}</TableCell>
                  <TableCell align="right">{date.toDateString()}, {date.toLocaleTimeString()}</TableCell>

                  <TableCell align="right">
                                <div>
                               <VisibilityIcon onClick={handleToggle} style={{color: "#8a2b06",cursor: "pointer"}}/>
                              <DeleteForeverIcon onClick={() => onDelete(postId)} style={{marginLeft:10,color: "#f44336",cursor: "pointer"}} />
                                </div>
                            </TableCell>
                </TableRow>

              </React.Fragment>

              <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={open2}
     onClick={handleClose2}
   >

<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440}}>
<Table aria-label="collapsible table"
stickyHeader aria-label="sticky table">
<TableHead 

>
<TableRow >
  <TableCell sx={{borderBottom: "2px solid #8a2b06"}}/>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}}>{name}</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}}>FOOD NAME</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">QUANTINTY</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">PRICE PER ITEM</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right"></TableCell>

  <TableCell sx={{backgroundColor: "",borderBottom: `2px solid #8a2b06`}}/>
</TableRow>
</TableHead>
<TableBody>
<React.Fragment>

{questions?.map((question,qindex)=>(


                            <TableRow   sx={{ '& > *': { borderBottom: 'unset' } }}>

                    
                            <TableCell>
                              
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <span style={{fontWeight: "600"}}><b>{qindex + 1}.</b></span>
                            </TableCell>
                            <TableCell>
                            {question?.name}
                            </TableCell>
                            <TableCell align="right">{question?.amount}</TableCell>
                            <TableCell align="right">Ksh{question?.price}</TableCell>
                            <TableCell align="right"><img style={{width: "4rem",height:"4rem",padding: "0.8rem",margin: "auto"}} src={question.image} alt={question.name} /></TableCell>

          
                          </TableRow>
                      
                        )
                        
)}


              </React.Fragment>
</TableBody>
</Table>
</TableContainer>
</Paper>

   </Backdrop>

            </>
    )
     }

};



export default Posts