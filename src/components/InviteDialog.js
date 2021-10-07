//import * as React from 'react';
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {Paper} from "@material-ui/core"
import InviteSearchResult from "./InviteSearchResult";
import axios from "axios";
import { membersByUsernameUrl } from "../URLs";
import { configure } from "@testing-library/dom";

const useStyle = makeStyles((theme) => ({
  result: {
      width: '100%',
      background: "#a7c2ee",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
}))


export default function InviteDialog(props) {
  let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }
  const classes = useStyle();
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
      axios.get(membersByUsernameUrl+patern,configToken).then(res=>{console.log(res.data);setResult(res.data)}).catch(err=>{console.log(err);alert("Error")});
      console.log(result);}
      else {
          alert("Only alphanumeric characters and underscore allowed.");
      }

  }

  function cancle()
  {
    setResult([]);
    props.setOpenDialog(false);
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
            autoComplete="off"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
            onKeyDown={(e)=>{ 
              if(e.key=="Enter")
              {   
                  e.preventDefault();
                  find(pattern);  
              } 
              else if(e.key=="Escape")
              {
                  e.preventDefault();
                  cancle();
              }
          }}
          />
          <DialogActions>
          <Button onClick={()=>cancle()}>Cancel</Button>
          <Button onClick={()=>find(pattern)}>Find</Button>
        </DialogActions>
          <div>Search results:</div>
          <div >
          {  
            result.map((res)=>{ return <InviteSearchResult searchRes={res}/> })
          }
        </div>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}