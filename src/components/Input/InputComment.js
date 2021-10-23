import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";

export function InputComment(props)
{

 let[pomText,setPomText]=useState("");

 function handleOnChange(e) 
 {
     setPomText(e.target.value);
 }

 function addComment()
 {
     props.addComment(pomText);
     setPomText("");
 }

return(<div>
<TextField
autoFocus
multiline
margin="dense"
id="text"
autoComplete="off"
label="Enter text here..."
type="text"
fullWidth
onChange={handleOnChange}
value={pomText}
variant="standard"
onKeyDown={(e)=>{ 
  if(e.key=="Enter")
  {   
      e.preventDefault();
      addComment();
  }
  else if(e.key=="Escape")
  {
      e.preventDefault();
      props.cancle();
  }
}}
/>
 <DialogActions>
 <Button onClick={()=>props.cancle()}>CLOSE</Button>
 <Button onClick={()=>addComment()}>POST</Button>
</DialogActions>
</div>);
}