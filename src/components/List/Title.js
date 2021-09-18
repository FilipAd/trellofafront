import React, { useState } from "react";
import {Typography,InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {listsUrl} from "../../URLs";
import axios from "axios";


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
    },
    editableTitleContainer:{
        marginLeft: theme.spacing(1),
        display: "flex",
        fontSize:"1.2rem",
        fontWeight:"bold",
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

    function handleOnChange(e) 
    {
        setPomTitle(e.target.value);
    }



    function handleEdit()
    {
    const updatedList={idList:props.listId,idBoard:props.idBoard,name:pomTitle};
    axios.put(listsUrl+props.listId,updatedList)
       .then(response => console.log(response));
       props.setTitle(pomTitle);
       setPomTitle("");
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
                onBlur={handleEdit}
                onChange={handleOnChange}
                />
            </div>
            ):(
            <div className={classes.editableTitleContainer}>
            <Typography onClick={()=>setOpen(!open)} className={classes.editableTitle}>{props.title}</Typography>
            <MoreHorizIcon/>
            </div> 
            )
        }
            
            
        </div>
    );
}