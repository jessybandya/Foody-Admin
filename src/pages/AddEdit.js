import React,{useState,useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import "./AddEdit.css"
import { db,auth,storage }  from "../components/firebase"
  import { ToastContainer, toast } from 'react-toastify';
  import { useDispatch,useSelector } from 'react-redux';

const initializeState = {
    name: '',
    restaurant: '',
    price: '',
    image: ''
}
function AddEdit() {
    const [state, setState] = useState(initializeState)
    const [data,setData] = useState({})
    const history = useHistory()
    const {id} = useParams()
    let {user} = useSelector((state)=> ({...state}));
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(initializeState.image)


console.log("Image: ",imageAsUrl)
     const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
  }
    const {name, restaurant, price, image} = state;

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
    }, [id])

    useEffect(() =>{
    if(id){
        setState({...data[id]})
    }else{
        setState({...initializeState})
    }
    return() => {
        
    }
    },[id, data])

    const handleInputChange = (e) => {
        const {name,value} = e.target;        
        setState({...state,[name]: value})
    }



const handleFireBaseUpload = e => {
      e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })
    }




    const handleSubmit = (e) => {
        e.preventDefault();



        if(!name || !restaurant || !price ||!image){
            toast.error("Please provide value in each input field!")
        }else{
            if(!id){
                db.child("menu").push(state, (err) => {
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Menu been added successfully")
                    }
                });
            }else{
                db.child(`menu/${id}`).set(state, (err) => {
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Menu been updated successfully")
                    }
                });
            }

            setTimeout(() => history.push("/home"), 500)
    }

        
    }

    return (
        <div style={{marginTop: "100px"}}>
            <form style={{margin: "auto",padding: "15px",maxWidth: "400px",alignContent: "center"}}
            onSubmit={handleSubmit}>
                <div style={{textAlign: "center"}}>
            <label  htmlfor="name">Food Name</label>
            </div>
            <input
            type="text"
            id="name"
            name="name"
            placeHolder="Enter food Name..."
            value={name || ""}
            onChange={handleInputChange}
            />
                       <div style={{textAlign: "center"}}>
            <label  htmlfor="name">Description</label>
            </div>
            <input
            type="text"
            id="restaurant"
            name="restaurant"
            placeHolder="Enter Food Description..."
            value={restaurant || ""}
            onChange={handleInputChange}
            style={{height: 100}}
            />
           <div style={{textAlign: "center"}}>
            <label  htmlfor="name">Price</label>
            </div>
            <input
            type="number"
            id="price"
            name="price"
            placeHolder="Enter food price..."
            value={price || ""}
            onChange={handleInputChange}
            />
           <div style={{textAlign: "center"}}>
            <label  htmlfor="name">Image URL</label>
            </div>
            <input
            type="text"
            id="image"
            name="image"
            placeHolder="Paste your image URL here..."
            value={image || ""}
            onChange={handleInputChange}
            />

            <input type="submit" value={id ? "Update": "save"} />
            </form>
        </div>
    )
}

export default AddEdit
