import React, {useState} from "react";
import {InputBase,Button,IconButton,} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import Background from "../background6.jpg";
import { Redirect } from "react-router";
import Invitation from "./Invitation";
import { boardHasMembersUrl, boardsUrlEnd, invitationUrl, loginEnd } from "../URLs";
import axios from "axios";
import { Link } from "react-router-dom";



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
    background:"#467e83 ",
    
    color:"white",
    "&:hover":{
        background:fade("#b9ebea",0.75),
        color:"black",
    }
},
link:{
    textDecoration:"none",
    margin:theme.spacing(1,3,1,1),
}
}))

export default function Invitations(props)
{

    let configToken=null;
    let userFromStorage=JSON.parse(localStorage.getItem("user"));
      if(userFromStorage!==null)
      {
      configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
      }

    const[invite,setInvite]=useState([]);
    const[redirectToLogin,setRedirectToLogin]=useState(false);
    React.useEffect(()=>{axios.get(invitationUrl+JSON.parse(localStorage.getItem("user")).id,configToken).then(res=>{setInvite(res.data);console.log("EVO IDE:"+res.data)});},[]);

    function deleteInvitation(invitation) {
        axios.delete(invitationUrl+invitation.id,configToken).then(setInvite(invite.filter(inv=>inv.id !== invitation.id)));
    }
    function checkIfMember(result, invitation) {
        console.log(result);
        if (result !== null && result.data.length > 0)
        {
            alert("You are already a member of this board.");
        }
        else {
        let table_member = {idBoard: invitation.idBoard, idMember: invitation.idMember}
        axios.post(boardHasMembersUrl, table_member,configToken).then(res=>{console.log(res.data)})
        }

    }
    function accept(invitation) {
        axios.get(boardHasMembersUrl+invitation.idMember+"/"+invitation.idBoard,configToken).then(res=>checkIfMember(res, invitation));
        
        deleteInvitation(invitation);
    }

    function handleLogout()
    {
        localStorage.removeItem("user");
        setRedirectToLogin(true);
    }

    const classes=useStyle();

    if(redirectToLogin)
    {
    return <Redirect to={loginEnd}/>
    }
 
    return(
    <div className={classes.root}>
        <div align="right">
        <Link to={boardsUrlEnd} className={classes.link}> <Button className={classes.btnConfirm}>BACK TO BOARDS</Button></Link>
        <Button className={classes.btnConfirm} onMouseDown={()=>handleLogout()}>LOGOUT</Button>
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