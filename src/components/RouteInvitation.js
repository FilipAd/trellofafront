import React, {useState} from "react";
import {InputBase,Button,IconButton,} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import Background from "../background6.jpg";
import { Redirect } from "react-router";
import Invitation from "./Invitation";
import { boardHasMembersUrl, invitationUrl } from "../URLs";
import axios from "axios";



const useStyle = makeStyles((theme) =>({

root:{
    align:"center",
    height:"100vh",
    padding:"30px",
    backgroundImage:`URL(${Background})`,
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    overflowX: "scroll",
},
title:
{
    fontSize:"50px",
    fontFamily:"Lucida Handwriting",
    padding:"30px",
    textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
},
btnConfirm:{
    background:"#286ad4 ",
    color:"white",
    "&:hover":{
        background:fade("#b9ebea",0.75),
        color:"black",
    }
},
}))

export default function Invitations(props)
{

    const[invite,setInvite]=useState([]);
    React.useEffect(()=>{axios.get(invitationUrl+JSON.parse(localStorage.getItem("user")).id).then(res=>{setInvite(res.data);console.log("EVO IDE:"+res.data)});},[]);

    function deleteInvitation(invitation) {
        axios.delete(invitationUrl+invitation.id).then(setInvite(invite.filter(inv=>inv.id !== invitation.id)));
    }
    function checkIfMember(result, invitation) {
        console.log(result);
        if (result !== null && result.data.length > 0)
        {
            alert("You are already a member of this board.");
        }
        else {
        let table_member = {idBoard: invitation.idBoard, idMember: invitation.idMember}
        axios.post(boardHasMembersUrl, table_member).then(res=>{console.log(res.data)})
        }

    }
    function accept(invitation) {
        axios.get(boardHasMembersUrl+invitation.idMember+"/"+invitation.idBoard).then(res=>checkIfMember(res, invitation));
        
        deleteInvitation(invitation);
    }
    const classes=useStyle();
    return(
    <div className={classes.root}>
        <div align="right">
        <Button className={classes.btnConfirm}>LOGOUT</Button>
        </div>
        <div align="center">
         <div className={classes.title}>
            INVITATIONS:
        </div>
        {
            invite.map(inv=>{return <Invitation inv={inv} deleteInvitation={deleteInvitation} accept={accept}/>})
        }
        </div>
        </div>
        );
}