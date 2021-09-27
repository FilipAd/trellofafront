import React, {useState} from "react";
import {InputBase,Button} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import Board from "./Board";
import axios from "axios";
import {boardsUrl,loginEnd,membersUrl,boardsByMemberEnd,boardHasMembersUrl} from "../../URLs";
import Background from "../../background6.jpg";
import Login from "../Forms/Login";
import { Redirect } from "react-router";




const useStyle = makeStyles((theme) =>({

 createInput : {
    width: "400px",
    height: "40px",
    fontSize: "22px",
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
        console.log("usli smo u funkciju")
        setBoardTitle(boardTitle)
        let updatedBoards=[]
        let newBoard={name:boardTitle,id:-1,idOrganization:1}
        let newBoardId=0
        axios.post(boardsUrl,newBoard).then(res=>{updatedBoards=[...boards,res.data];setBoard(updatedBoards);
        let newBoardHasMembers={idBoard:res.data.id,idMember:JSON.parse(localStorage.getItem("user")).id}
        axios.post(boardHasMembersUrl,newBoardHasMembers).then(res=>console.log("proslo")).catch(err=>{alert("Error")})
        }).catch(err=>{alert("Error")})
      //  console.log="EVO IDEA :"+newBoardId
       // let newBoardHasMembers={idBoard:newBoardId,idMember:JSON.parse(localStorage.getItem("user")).id}
      //  axios.post(boardHasMembersUrl,newBoardHasMembers).then(res=>console.log("proslo")).catch(err=>{alert("Error")})
        
    }

    let userFromStorage=JSON.parse(localStorage.getItem("user"));
    let configToken=null;
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

    React.useEffect(()=>{axios.get(membersUrl+userFromStorage.id+boardsByMemberEnd,configToken).then(res=>{setBoard(res.data);console.log(res.data)});},[]);

    if(!boards) return null;

  
    

  if(redirectToLogin)
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
        <Button className={classes.btnConfirm} onMouseDown={()=>handleLogout()}>LOGOUT</Button>
        </div>
        <div className={classes.createInput}>


        <form >
        <InputBase
          placeholder="Your boards title..."
          type="text"
          onChange={handleOnChange}
          onKeyDown={(e)=>{  if(e.key=="Enter")
                                {   
                                    e.preventDefault();
                                    handleCreateBoard();
                                    
                                } 

                    }}
        />
        </form>


        </div>
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

