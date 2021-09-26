import React, { Component, useState,useEffect, useDebugValue} from "react";
import {Paper,Typography,CssBaseline,InputBase} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import { withTheme } from "styled-components";
import Board from "./Board";
import axios from "axios";
import {boardsUrl} from "../../URLs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RouteList from "../List/RouteList";
import Background from "../../background6.jpg"


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
        color: "white",
        fontWeight: "bold",
        fontFamily: "Lucida Handwriting",
        align:"center",
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
    },
}))



export default function RouteBoard(props)
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
           boards.map(board=>{return <Board board={board} setBoard={setBoard} setBoardId={props.setBoardId} boards={boards} setBoardTitle={setBoardTitle} boardTitle={boardTitle}/>})
            }   
        </div>

        </div>
        
        );
        
    }

