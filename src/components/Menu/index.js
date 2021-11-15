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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db,auth}  from '../firebase';

function Menu() {
    const [data, setData] = useState({})

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
           
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440}}>
<Table aria-label="collapsible table"
stickyHeader aria-label="sticky table">
<TableHead 

>
<TableRow >
  <TableCell sx={{borderBottom: "2px solid #8a2b06"}}/>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}}>FOOD</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">DESCRIPTION</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">PRICE(Ksh)</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #8a2b06",color:`#8a2b06`}} align="right">ACTION</TableCell>
  <TableCell sx={{backgroundColor: "",borderBottom: `2px solid #8a2b06`}}/>
</TableRow>
</TableHead>
<TableBody>
{/* {
    posts.map(({ id, post }) => (
        < Posts 
        key={id} 
        postId={id} 
        academicBook={post.academicBook} 
        academicField={post.academicField} 
        academicFieldTopic={post.academicFieldTopic}
        timestamp={post.timestamp}        

 
        />

    ))
} */}

<React.Fragment>

{Object.keys(data).map((id, index) => {
                        return(
                            <TableRow  key={id} sx={{ '& > *': { borderBottom: 'unset' } }}>

                    
                            <TableCell>
                              <span style={{fontWeight: "600"}}>{index + 1}.</span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {data[id].name}
                            </TableCell>
                            <TableCell align="right">{data[id].restaurant}</TableCell>
                            <TableCell align="right">{data[id].price}</TableCell>
                            <TableCell align="right">
                                <div>
                                <a href={`/update/${id}`}>
                              <EditIcon style={{color: "#8a2b06",cursor: "pointer"}}/>
                              </a>
                              <DeleteForeverIcon onClick={() => onDelete(id)} style={{marginLeft:10,color: "#f44336",cursor: "pointer"}} />
                                </div>
                            </TableCell>
          
                          </TableRow>
                        )
                    })}


              </React.Fragment>
</TableBody>
</Table>
</TableContainer>
</Paper> 
        </div>
    )
}

export default Menu
