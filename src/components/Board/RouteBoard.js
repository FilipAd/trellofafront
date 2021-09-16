import React, { Component, useState } from "react";
import {Paper,Typography,CssBaseline,InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { withTheme } from "styled-components";
import Board from "./Board";
import axios from "axios";
import {boardsUrl} from "../../URLs";




export default class RouteBoard extends Component
{
 
    
  state=
  {
  boards:[]
  }
    
    
    constructor()
    {
        super();
        axios.get(boardsUrl).then(res=>{console.log("evooooo ga"+res.data); this.setState({boards:res.data})});
    }
    
  render()
  {
    const CreateInput = {
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
    }

    const CreateTitle = {
        fontSize: "20px",
        color: "black",
        fontWeight: "bold",
        fontFamily: "Lucida Handwriting",
        align:"center",
    }


    const root={
        align:"center",
    }
   const title=
    {
        fontSize:"70px",
        fontFamily:"Lucida Handwriting",
    }

    return(
      
        <div style={root}>
            
        <div style={CreateTitle}>
            CREATE NEW BOARD:
        </div>
        <div style={CreateInput}>
        <form >
        <InputBase
          onChange=""
          placeholder="Your boards title..."
          type="text"
        />
      </form>
        </div>

        <div align="center">
            <div style={title}>
            <h>BOARDS</h>
            </div>
            {
            this.state.boards.map(board=>{ return <Board title={board.name}></Board>})
            }
        </div>

       

        </div>
        );
    }

}