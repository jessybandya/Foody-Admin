import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import { db,auth} from "../components/firebase"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "../components/Header"
import Menu from "../components/Menu"
import Orders from "../components/Orders"
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Home() {

    let {user} = useSelector((state)=> ({...state}));
    const history = useHistory()
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false)
    const [academicField, setAcademicField] = useState("")
    const [academicFieldTopic, setAcademicFieldTopic] = useState("")
    const [academicBook, setAcademicBook] = useState("")
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(true);
    const [posts2, setPosts2] = useState([]);
    const [input1, setInput1] = useState("");
    const [posts1, setPosts1] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [data, setData] = useState({})
    const [surveys, setSurveys] = useState("Survey")
    const [dash, setDash] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [showOrders, setShowOrders] = useState(false)

    if(!user){
        history.push("/")
    }

    const showMenu1 = () =>{
        setShowMenu(true)
        setShowOrders(false)
     }
     const showOrders1 = () =>{
        setShowMenu(false)
        setShowOrders(true)
     }
    useEffect(() => {
        db.child("menu").on("value", (snapshot) => {
            if(snapshot.val()!== null){
                setData({...snapshot.val()})
            }else{
                setData({})
            }
        });

        return() =>{
            setData({})
        }
    }, [])

    const onDelete = (id) =>{
        if(window.confirm("Are you sure you want to delete this menu?")){
            db.child(`/menu/${id}`).remove((err) => {
                if(err){
                    toast.error(err)
                }else{
                   toast.success("Menu deleted successfully") 
                }
            })
        }
    }
    return (
        <div>
                  <div className="RecommendedBody">
                  <div style={{alignItems: "center",display: "flex",alignSelf: "center",justifyContent:"center",marginTop:20}}>
               <Button onClick={showMenu1} variant="contained" style={{backgroundColor: "#8a2b06",fontWeight:"900"}} color="success">
        Menu
      </Button>
      <Button onClick={showOrders1} style={{backgroundColor: "#fff",color: "#8a2b06",fontWeight:"900",border: "1px solid #8a2b06",marginLeft:8}} variant="contained" color="success">
        Orders
      </Button>
               </div>

{showMenu ?(
    <Menu style={{marginTop:15}} />
): showOrders ?(
<Orders />
):(
    <Menu style={{marginTop:15}} />

)}
               

 






<div >
<Box sx={{  flexGrow: 1 }}>
    <a href="/add">
<SpeedDial
ariaLabel="SpeedDial basic example"
sx={{ position: 'absolute', bottom: 25, right: 16 }}
icon={
  <Fab style={{backgroundColor: `#8a2b06`,color: "#fff"}} aria-label="add">
  <SpeedDialIcon />
</Fab>}
>

</SpeedDial>
</a>
</Box>
</div>


</div>
        </div>
    )
}

export default Home
