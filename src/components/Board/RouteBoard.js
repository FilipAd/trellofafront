import React, { Component, useState,useEffect, useDebugValue} from "react";
import {Paper,Typography,CssBaseline,InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { withTheme } from "styled-components";
import Board from "./Board";
import axios from "axios";
import {boardsUrl} from "../../URLs";


const useStyle = makeStyles((theme) =>({

 createInput : {
    width: "400px",
    height: "40px",
    fontSize: "22px",
    padding: "10px",
    boxSizing: "borderBox",
    borderRadius: "3px",
    border: "none",
    outlineColor: "blue",
    boxShadow: "0 2px 4px grey",
    alignSelf: "center",
    },

    createTitle :{
        fontSize: "20px",
        color: "black",
        fontWeight: "bold",
        fontFamily: "Lucida Handwriting",
        align:"center",
    },
    root:{
        align:"center",
        padding:"30px",
    },
   title:{
        fontSize:"50px",
        fontFamily:"Lucida Handwriting",
        padding:"30px",
    },
}))



export default function RouteBoard()
{
 
  const classes=useStyle();
  const [boards,setBoard]=useState(null);
  const [boardTitle,setBoardTitle]=useState("");

  function handleOnChange(e) 
    {
        setBoardTitle(e.target.value);
    }


    React.useEffect(()=>{axios.get(boardsUrl).then(res=>{setBoard(res.data);console.log(res.data)});},[]);

    if(!boards) return null;

  
    

  

    return(
        <div className={classes.root}>
        <div align="center">
         <div className={classes.createTitle}>
            CREATE NEW BOARD:
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
                                    setBoardTitle(boardTitle);
                                    let updatedBoards=[];
                                    let newBoard={name:boardTitle,id:-1,idOrganization:1};
                                    axios.post(boardsUrl,newBoard).then(res=>{updatedBoards=[...boards,res.data];setBoard(updatedBoards)}).catch("error");
                                    
                                    
                                    
                                } 

                    }}
        />
        </form>


        </div>
        </div>
        <div className={classes.title} align="center">
            <h>BOARDS</h>
            </div> 
        <div align="center">
            {
           boards.map(board=>{return <Board board={board} setBoard={setBoard} boards={boards} setBoardTitle={setBoardTitle} boardTitle={boardTitle}/>})
            }
        </div>

        </div>
        );
    }

