import React, {useState} from "react";
import {InputBase,Button,IconButton,Badge} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import Board from "./Board";
import axios from "axios";
import {boardsUrl,loginEnd,membersUrl,boardsByMemberEnd,boardHasMembersUrl,invitationsEnd, labelsUrl, invitationUrl} from "../../URLs";
import Background from "../../background6.jpg";
import Login from "../Forms/Login";
import { Redirect,Link } from "react-router-dom";
import MailOutline from "@material-ui/icons/MailOutline";




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
        margin:theme.spacing(0,5,0,0),
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

    function handleCreateBoard()
    {
        setBoardTitle(boardTitle)
        let updatedBoards=[]
        let newBoard={name:boardTitle,id:-1,idOrganization:1}
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
        <div className={classes.root}>
        <div align="center">
         <div className={classes.createTitle}>
            CREATE NEW BOARD:
        </div>
        <div align="right">
        <Link to={invitationsEnd}>
        <IconButton className={classes.message}>
            <Badge  badgeContent={numberOfInvitations} color="secondary" invisible={checkInvitations()}>
            
            <MailOutline fontSize="large"/>
            
            </Badge>
        </IconButton>
        </Link>
        <Button className={classes.btnConfirm} onMouseDown={()=>handleLogout()}>LOGOUT</Button>
        </div>
        


        
        <InputBase
            className={classes.createInput}
          placeholder="Your boards title..."
          type="text"
          onChange={handleOnChange}
          onKeyDown={(e)=>{  if(e.key=="Enter")
                                {   
                                    e.preventDefault();
                                    handleCreateBoard();
                                    
                                } 

                        }}/>
        


       
        </div>
        <div className={classes.title} align="center">BOARDS</div> 
        <div align="center"> 
            { 
           boards.map(board=>{return <Board board={board} setBoard={setBoard} setBoardId={props.setBoardId} boards={boards} setBoardTitle={setBoardTitle} boardTitle={boardTitle}/>})
            }   
        </div>

        </div>
        
        );
        
    }

