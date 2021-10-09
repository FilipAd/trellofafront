import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import {Paper} from "@material-ui/core"
import InviteSearchResult from "./InviteSearchResult";
import axios from "axios";
import { cardhaslabelsUrl, deleteEnd, labelsUrl, membersByUsernameUrl } from "../URLs";
import LabelThumbnail from "./LabelThumbnail";
import InputLabel from "./Input/InputLabel";


const useStyle = makeStyles((theme) =>({
  label:{
      fontWeight:"bold",
      marginTop:"10px",
      textAlign:"center",
  } 
}))



export default function YesNoCardDeleteDialog(props) {

  let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

  const classes=useStyle();
  function cancle()
  {
    props.setOpenYesNoDialog(false);
  }
  function handleDelete(id)
  {
    props.handleDelete(id)
  }

  return (
    <div>
      <Dialog open={props.open}  onKeyDown={(e)=>{ 
              if(e.key=="Escape")
              {   
                  e.preventDefault();
                  cancle();
              }}}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
      
          <DialogContentText className={classes.label}>
         Delete this card ? 
          </DialogContentText>

          <DialogActions>
          <Button onClick={()=>handleDelete(props.cardId)}>Delete</Button>
          <Button onClick={()=>cancle()}>Cancel</Button>
        </DialogActions>

        </DialogContent>
       
      </Dialog>
    </div>
  );
}