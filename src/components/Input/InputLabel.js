import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import { CirclePicker } from 'react-color';

export default function InputLabel(props)
{

 let[pomText,setPomText]=useState("");
 let[labelColorPom,setLabelColorPom]=useState("#607d8b")

 function handleOnChange(e) 
 {
     setPomText(e.target.value);
 }

 function addLabelPom()
 {
     props.handleAdd(pomText,labelColorPom);
     setPomText("");
 }

 const pickColor=(color)=>
  {
      setLabelColorPom(color.hex);
  };


return(<div>
 <TextField
            autoFocus
            margin="dense"
            id="labelName"
            autoComplete="off"
            label="Name"
            type="Name"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
            onKeyDown={(e)=>{ 
              if(e.key=="Enter")
              {   
                  e.preventDefault();
                  addLabelPom();

              } 
              else if(e.key=="Escape")
              {
                  e.preventDefault();
                  props.cancle();
                  
              }
          }}
          />
          <DialogActions>
          <Button onClick={()=>props.cancle()}>Cancel</Button>
          <Button onClick={()=>addLabelPom()}>ADD</Button>
        </DialogActions>
        <CirclePicker onChangeComplete={pickColor}/>
</div>);
}