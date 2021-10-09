import React, { useState } from "react";
import {Paper,IconButton,InputBase,Collapse} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { invitationUrl } from "../URLs";


const useStyle = makeStyles((theme) =>({
    board: {
        color:"black",
        fontSize:"20px",
        multiline:"true",
        overflow:"hidden",
        width : '40%',
        background:"#dcf5ff",
        borderRadius:"30px",
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
        boxShadow: "0 10px 6px #5a6566",
    },
    buttonYes:
    {
        fontSize:"30px",
        color:"green",
    },
    buttonNo:
    {
        fontSize:"30px",
        color:"red",
        
    },
        }))
export default function Invitation(props)
{
    const classes=useStyle();
    return(<div>
    <Paper className={classes.board}>
        <div><div>FROM: {props.inv.sender} </div><div>TABLE: {props.inv.boardName}</div></div>    
    <div>
        <IconButton onClick={()=>props.accept(props.inv)}>
                <CheckIcon className={classes.buttonYes}/>
        </IconButton>
        <IconButton onClick={()=>props.deleteInvitation(props.inv)}>
                <ClearIcon className={classes.buttonNo}/>
        </IconButton>
        </div>
        </Paper>
    </div>
    );
}