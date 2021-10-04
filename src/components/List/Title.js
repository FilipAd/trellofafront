import React, { useState } from "react";
import {Typography,InputBase,IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {listsUrl} from "../../URLs";
import axios from "axios";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';


const useStyle = makeStyles((theme) =>({
    root: {
        width : '300px',
        background:"#EBECF0",
        marginLeft:theme.spacing(1),
    },
    editableTitle:{
        flexGrow:1,
        fontSize:"1.2rem",
        fontWeight:"bold",
        overflow:"hidden",

    },
    editableTitleContainer:{
        marginLeft: theme.spacing(1),
        overflow:"hidden",
        fontSize:"1.2rem",
        fontWeight:"bold",
        overflow:"hidden",
    },
    input:{
        margin:theme.spacing(1),
        "&:focus":{
            background:"#ddd",
        }
    }
}))
export default function Title(props)
{
    const classes=useStyle();
    const [open,setOpen]= useState(false);
    const [pomTitle,setPomTitle]=useState(props.title);
    let userFromStorage=JSON.parse(localStorage.getItem("user"));
    let configToken=null;
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

    function handleOnChange(e) 
    {
        setPomTitle(e.target.value);
    }



    function handleEdit()
    {
    const updatedList={idList:props.listId,idBoard:props.idBoard,name:pomTitle};
    axios.put(listsUrl+props.listId,updatedList,configToken)
       .then(response => console.log(response));
       props.setTitle(pomTitle);
       setOpen(!open);
    }

    return ( 
        <div>
            {open?(
            <div>
                <InputBase 
                value={pomTitle}
                autoFocus
                inputProps={{
                className:classes.input
                }}
                fullWidth
                onChange={handleOnChange}
                onKeyDown={(e)=>{ 
                if(e.key=="Enter")
                {   
                    e.preventDefault();
                    handleEdit();  
                } 
                else if(e.key=="Escape")
                {
                    e.preventDefault();
                    setOpen(!open);
                }
            }}

                />
                <div>
                <IconButton onMouseDown={()=>handleEdit()}>
                <CheckIcon/>
                </IconButton>
                <IconButton onMouseDown={()=>setOpen(!open)}>
                <ClearIcon/>
                </IconButton>
        
                </div>
            </div>
            ):(
            <div className={classes.editableTitleContainer}>
           
            <Typography className={classes.editableTitle}>{props.title}
            <IconButton  onClick={()=>setOpen(!open)}>
                    <EditIcon/>
            </IconButton></Typography>
            
            
            </div> 
            )
        }  
            
        </div>
    );
}