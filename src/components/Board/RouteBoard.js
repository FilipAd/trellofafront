import React, {useState} from "react";
import {InputBase,Button,IconButton,Badge,Avatar,Paper} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import Board from "./Board";
import axios from "axios";
import {boardsUrl,loginEnd,membersUrl,boardsByMemberEnd,boardHasMembersUrl,invitationsEnd, labelsUrl, invitationUrl} from "../../URLs";
import Background from "../../background6.jpg";
import Login from "../Forms/Login";
import { Redirect,Link } from "react-router-dom";
import MailOutline from "@material-ui/icons/MailOutline";
import { InputBoard } from "../Input/InputBoard";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';




const useStyle = makeStyles((theme) =>({

 createInput : {
    width: "400px",
    fontSize: "22px",
    background:"#f0f0f0",
    padding: "10px",
    boxSizing: "borderBox",
    borderRadius: "3px",
    border: "solid",
    outlineColor: "blue",
    boxShadow: "0 6px 6px grey",
    alignSelf: "center",
    },

    createTitle :{
        fontSize: "20px",
        color: "black",
        fontWeight: "bold",
        fontFamily: "Lucida Handwriting",
        align:"center",
        textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
    },
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
   title:{
        fontSize:"50px",
        fontFamily:"Lucida Handwriting",
        padding:"30px",
        textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
    },
    logout:{
        align:"right",
    },
    message:
    {
        margin:theme.spacing(0.5,5,0,0),
      //  background:"#e9eef2 ",
        width:"40px",
        height:"40px",
        "&:hover":{
            background:fade("#467e83",0.5),
            color:"black",
        }
    },
    icon:
    {
        color:"#5c6b66",
        width:"50px",
        fontSize:"40px",  "&:hover":{
            color:"white",
        }
    },
    avatar:
    {
    margin:theme.spacing(0.5,2,0,0),
    color:"white",
    background:"#467e83"
    },
    line:
    {
    //  display:"flex",
      background:"#d3e6c1",
      height:"60px",
      width:"100%", 
      flexDirection:"row",
      marginLeft:"0px",
      margin:theme.spacing(0,1,1,1),
      textAlign:"right",
      outlineColor: "blue",
      boxShadow: "0 5px 5px grey",
  
    },
    btnConfirm:{
        background:"#467e83",
        color:"white",
        margin:theme.spacing(0.5,3,0,1),
        "&:hover":{
            background:fade("#b9ebea",0.75),
            color:"black",
        }
    },
    userButton:{
        margin:theme.spacing(0,2,0,3),
        fontFamily:"Roboto"
    },
    username:{
        fontSize:"20px",
       fontFamily:"Arial"

    }
}))



export default function RouteBoard(props)
{
 
  const classes=useStyle();
  const [boards,setBoard]=useState(null);
  const [boardTitle,setBoardTitle]=useState("");
  const [redirectToLogin,setRedirectToLogin]=useState(false);
  let [numberOfInvitations,setNumberOfInvitations]=useState([]);
  let [showBadge,setShowBadge]=useState(true);
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
  let configToken=null;
  let userFromStorageId=null;
  if(userFromStorage!==null)
  {
  configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
  userFromStorageId=JSON.parse(localStorage.getItem("user")).id;
  }
 
 
  function checkInvitations()
  {
      console.log("check " +numberOfInvitations);
      if(numberOfInvitations>0)
          return false;
      else
          return true ;  
  }
  
    function handleOnChange(e) 
    {
        setBoardTitle(e.target.value);
    }
    function handleLogout()
    {
        localStorage.removeItem("user");
        setRedirectToLogin(true);
    }

    function handleCreateBoard(titlePom)
    {
        setBoardTitle(boardTitle)
        let updatedBoards=[]
        let newBoard={name:titlePom,id:-1,idOrganization:1}
        let newBoardId=0
        axios.post(boardsUrl,newBoard,configToken).then(res=>{updatedBoards=[...boards,res.data];setBoard(updatedBoards);
        let newBoardHasMembers={idBoard:res.data.id,idMember:JSON.parse(localStorage.getItem("user")).id}
        axios.post(boardHasMembersUrl,newBoardHasMembers,configToken).then(res=>console.log("proslo")).catch(err=>{alert("Error")})
        }).catch(err=>{alert("Error")})
        
    }


    
   
    React.useEffect(()=>{axios.get(membersUrl+userFromStorageId+boardsByMemberEnd,configToken).then(res=>{setBoard(res.data);console.log(res.data)});},[]);
    React.useEffect(()=>{axios.get(invitationUrl+JSON.parse(localStorage.getItem("user")).id,configToken).then(res=>{setNumberOfInvitations(res.data.length);console.log(res.data)});},[]);

 

    if(!boards) return null;

  
    if(redirectToLogin || userFromStorage==null)
    {
      return <Redirect to={loginEnd}/>
    }




  


    return(
        <div>
        <div className={classes.line}>
        <Button className={classes.userButton}><Avatar className={classes.avatar}/><div className={classes.username}>{JSON.parse(localStorage.getItem("user")).username}</div></Button>
        <Link to={invitationsEnd}>
        <IconButton className={classes.message} >
            <Badge  badgeContent={numberOfInvitations} color="secondary" invisible={checkInvitations()}>
            
            <MailOutline className={classes.icon} />
            
            </Badge>
        </IconButton>
        </Link>
        <Button className={classes.btnConfirm} onMouseDown={()=>handleLogout()}>LOGOUT</Button>
        
        </div>
        <div className={classes.root}>
        <div align="center">
            
         <div className={classes.createTitle}>
            CREATE NEW BOARD:
        </div>
        <div align="right">
       
        </div>
        

        <InputBoard handleCreateBoard={handleCreateBoard}/>

       
        </div>
        <div className={classes.title} align="center">BOARDS</div> 
        <div align="center"> 
            { 
           boards.map(board=>{return <Board board={board} setBoard={setBoard} setBoardId={props.setBoardId} boards={boards} setBoardTitle={setBoardTitle} boardTitle={boardTitle}/>})
            }   
        </div>

        </div>
        </div>
        );
        
    }

