import React, { useState } from "react";
import {Paper,Typography,CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { withTheme } from "styled-components";


const useStyle = makeStyles((theme) =>({

    root:
    {
        bacground:"red",
        align:"center",
    },
    board: {
        display:"flex",
        fontSize:"20px",
        width : '500px',
        height:'100px',
        background:"#80cbc4",
        marginLeft:theme.spacing(1),
        marginTop:theme.spacing(1),
        color:"white",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"Lucida Handwriting",
    },
    
}))
export default function Board(props)
{
    const classes=useStyle();
    return(
        
                <Paper className={classes.board}>
               {props.title}
               </Paper>
               
       
        );

}