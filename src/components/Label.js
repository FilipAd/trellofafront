import React,{useState} from "react";
import {Paper,IconButton,Collapse,Badge} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import axios from "axios";
import EditCard from "./Input/EditCard";
import {cardsUrl} from "../URLs";

const useStyle = makeStyles((theme) =>({
  label:{
      height:"10px",
      width:"10px",
  } 
}))


export default function Label(props)
{
  const classes=useStyle();
  
  let check=() =>
  {
    for(let i=0;i<props.labelThumbnail.length;i++)
    {
        if(props.labelThumbnail.id===props.cardHasLabelsByCardId.idLabel)
        {
          return true;
        }
    }
  }
  return(
    <IconButton className={classes.label}>
    <LabelIcon style={{color:`${props.color}`}}/>
    </IconButton>  
  ); 
}

