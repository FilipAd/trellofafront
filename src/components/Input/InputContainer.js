import React, { useState } from "react";
import {Paper,Typography,Collapse} from "@material-ui/core";
import {makeStyles, fade} from "@material-ui/core/styles";
import InputCard from "./InputCard";

const useStyle = makeStyles((theme) =>({
    root:{
        marginTop:theme.spacing(1),
        width:"300px"

    },
   addCard:{
       padding:theme.spacing(1,1,1,2),
       margin:theme.spacing(0,1,1,1),
       background:"#EBECF0",
       "&:hover":{
           backgroundColor: fade("#000",0.25),
       },

   }
}))

export default function InputContainer(props)
{
    const classes=useStyle();
    const [open,setOpen]=useState(false);
    //Ovo stoji na dnu liste za dodavanje karte
    // Collapse sakrivanje +Add a Card i pokazivanje forme
    //<InputCard setOpen={setOpen}/> slanje kao props InputCard elementu
    return (
        <div className={classes.root}>
            <Collapse in={open}>
            <InputCard setOpen={setOpen} listId={props.listId} addCard={props.addCard} type={props.type} setList={props.setList} lists={props.lists}/>
            </Collapse>
            <Collapse in={!open}>
            <Paper className={classes.addCard} elevation={0} onClick={ ()=>setOpen(!open)} >
            <Typography>
              {(props.type==="list")?"+ Add List":"+ Add Card"}
            </Typography>
        </Paper>
            </Collapse>
        </div>);
    
}