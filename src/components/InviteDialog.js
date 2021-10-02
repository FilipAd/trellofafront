//import * as React from 'react';
import React, { useState } from "react";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {Paper} from "@material-ui/core"
import InviteSearchResult from "./InviteSearchResult";
import axios from "axios";
import { membersByUsernameUrl } from "../URLs";




export default function InviteDialog(props) {
  const [open, setOpen] = useState(false);
    let [result,setResult]=useState([]);
    const [pattern,setPattern]=useState(null);

    function handleOnChange(e) 
    {
        setPattern(e.target.value);
    }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false)
  };
  
  function find(patern)
  {
      if(pattern.match(/^[a-zA-Z0-9_]+$/)) {
      console.log("EVOOOOOOOO LINKA:"+membersByUsernameUrl+patern);
      axios.get(membersByUsernameUrl+patern).then(res=>{console.log(res.data);setResult(res.data)}).catch(err=>{console.log(err);alert("Error")});
      console.log(result);}
      else {
          alert("Only alphanumeric characters and underscore allowed.");
      }

  }
  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter the name of the user you want to invite to your board
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
          <DialogActions>
          <Button onClick={()=>props.setOpenDialog(false)}>Cancel</Button>
          <Button onClick={()=>find(pattern)}>Find</Button>
        </DialogActions>
          <div>Search results:</div>
        {
            result.map((res)=>{ return <InviteSearchResult searchRes={res}/>})
        }
        </DialogContent>
        
      </Dialog>
    </div>
  );
}