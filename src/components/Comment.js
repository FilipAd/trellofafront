import React, { useEffect, useState } from "react";
import {Paper,IconButton,InputBase,Collapse,Button,Avatar} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { commentUrl, invitationUrl } from "../URLs";



const useStyle = makeStyles((theme) =>({
    board: {
        color:"black",
        fontSize:"15px",
        multiline:"true",
        overflow:"hidden",
        width : '40%',
        background:"#dcf5ff",
        borderRadius:"30px",
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
        boxShadow: "0 10px 6px #5a6566",
        width:"100%"
    },
    buttonYes:
    {
        fontSize:"20px",
        height:"20px",
        width:"20px",
    },
    buttonNo:
    {
        fontSize:"20px",
        height:"20px",
        width:"30px",        
    },
    buttons:
    {
        textAlign:"center",
    },
    user:
    {
        display:"flex",
        flexDirection:"row",
        marginLeft:"5px",
    },
    text:
    {
        textAlign:"left",
    },
    name:
    {
        marginLeft:"5px",
        fontWeight:"bold",
        fontSize:"15px",
    }
        }))

        
export default function Comment(props)
{

let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }
    const classes=useStyle();
    const [open,setOpen]=useState(false);
    let [updatedText,setUpdatedText]=useState(props.comment.text);

    function handleDelete(comment)
    {
        var answer=window.confirm("Delete Comment ?");
        if(answer)
        {
            props.deleteComment(comment);
        }  
    }


    function handleOnChange(e) 
    {
        
        setUpdatedText(e.target.value);
    }

    function handleCancle()
    {
        setUpdatedText(props.comment.text);
        setOpen(!open);
    }

    function handleConfirm()
    {
        let newText={idMember:props.comment.idMember,idCard:props.comment.idCard,text:updatedText}
        axios.put(commentUrl+props.comment.id,newText,configToken).then(res=>props.editComment(res.data)).catch(err=>alert(err));
        setOpen(!open);
    }



    return(<div>  
    <Collapse in={!open}>
    <Paper className={classes.board}>
    <div className={classes.user}>
    <Avatar><PersonOutlineIcon/></Avatar>
    <div className={classes.name}>{(props.comment.memberUsername)+":"}</div>
    </div>
        <div className={classes.text}>{props.comment.text}</div>    
    <div className={classes.buttons}>
        <IconButton className={classes.buttonYes} disabled={props.check} onMouseDown={()=>setOpen(!open)}>
                <EditIcon/>
        </IconButton>
        <IconButton className={classes.buttonNo}   disabled={props.check} onMouseDown={()=>handleDelete(props.comment)}>
                <DeleteIcon />
        </IconButton>
        </div>
        </Paper>
    </Collapse>

    <Collapse in={open}>
            <Paper className={classes.board}> 
            <InputBase
            onKeyDown={(e)=>{ 
                if(e.key=="Enter")
                {   
                    e.preventDefault();
                    handleConfirm();  
                } 
                else if(e.key=="Escape")
                {
                    e.preventDefault();
                    handleCancle();
                }
            }}
            onChange={handleOnChange}
            multiline 
            value={updatedText}
            fullWidth
           />   
        <div>
        <IconButton onMouseDown={()=>handleConfirm()}>
                <CheckIcon/>
        </IconButton>
        <IconButton onMouseDown={()=>handleCancle()}>
                <ClearIcon/>
        </IconButton>
        
        </div>
            </Paper>
        </Collapse>
        



    </div>
    );
}