import React, { useState } from "react";
import {Paper,IconButton,InputBase,Collapse,Button} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import axios from "axios";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
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
        fontSize:"15px",
        color:"green",
    },
    buttonNo:
    {
        fontSize:"20px",
        color:"red",
        
    },
        }))

    
function sendInvitation(idReceiver)
{
    let invitation={idMember:idReceiver,idBoard:localStorage.getItem("boardId"),sender:JSON.parse(localStorage.getItem("user")).username};
    axios.post(invitationUrl,invitation).then(res=>alert("successful")).catch(err=>alert("error"));

}
export default function InviteSearchResult(props)
{
    const classes=useStyle();
    return(<div>
    <Paper className={classes.board}>
        <div> {props.searchRes.username}
        <Button className={classes.buttonYes} onMouseDown={()=>sendInvitation(props.searchRes.id)}>SEND</Button> </div>   
        </Paper>
    </div>
    );
}