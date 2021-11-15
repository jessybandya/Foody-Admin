import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify'
import Posts from "./Posts"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db,auth}  from '../firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';

function Orders() {
    const [data, setData] = useState({})
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    useEffect(() => {
        db.child("orders").on("value", (snapshot) => {
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

    const time = (timestamp) =>{
        var d = timestamp;
        //var d =val.timestamp;
        
        //NB: use + before variable name
        var date = new Date(+d);

        return(
            <>
            {date.toDateString()}, {date.toLocaleTimeString()}
            </>
        )

        
    }
    return (
        <div>
           
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440}}>
<Table aria-label="collapsible table"
stickyHeader aria-label="sticky table">
<TableHead 

>
<TableRow >
  <TableCell sx={{borderBottom: "2px solid #8a2b06"}}/>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}}>C. NAME</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">COUNTY</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">EMAIL</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">TOTAL AMOUNT</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">TIME ORDERED</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">ACTION</TableCell>
  <TableCell sx={{backgroundColor: "",borderBottom: `2px solid #8a2b06`}}/>
</TableRow>
</TableHead>
<TableBody>

{Object.keys(data).map((id, index) => {

                        return(
                            <>
<Posts 
name={data[id].name}
city={data[id].city}
street={data[id].street}
totalAmount={data[id].totalAmount}
timestamp={data[id].timestamp}
postId={id}
questions={data[id].orderedItems}
i={index}
/>

</>
                        )
                        
                    })}


</TableBody>
</Table>
</TableContainer>
</Paper> 
        </div>
    )
}

export default Orders
