import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import {Paper} from "@material-ui/core"
import InviteSearchResult from "./InviteSearchResult";
import { CirclePicker } from 'react-color';
import axios from "axios";
import { cardhaslabelsUrl, deleteEnd, labelsUrl, membersByUsernameUrl } from "../URLs";
import LabelThumbnail from "./LabelThumbnail";


const useStyle = makeStyles((theme) =>({
  label:{
      fontWeight:"bold",
      marginTop:"10px",
      textAlign:"center",
  } 
}))



export default function InviteDialog(props) {

  const classes=useStyle();
  const [open, setOpen] = useState(false);
    let [result,setResult]=useState([]);
    const [pattern,setPattern]=useState(null);
    let[labelColor,setLabelColor]=useState("#607d8b");
    let[labelName,setLabelName]=useState("");
    let[pomChb,setPomChb]=useState([]);
    

  

    function handleOnChange(e) 
    {
        setLabelName(e.target.value);
    }

  
  
  const pickColor=(color)=>
  {
      setLabelColor(color.hex);
  };

  function cancle()
  {
    props.setOpenDialog(false);
  }

  function handleAdd()
  {
    let newLabel={color:labelColor,name:labelName};
    props.addLabel(newLabel);
    
  }

  function checkFunction(lab)
  {
    console.log("Izvrsi funckiju");
    for(let i=0;i<props.cardHasLabelsByCardId.length;i++)
    {
      if(lab.id===props.cardHasLabelsByCardId[i].idLabel)
      {
        return true;
      }
    }
    return false;
  }

  function attachLabel(lab)
  {
    axios.post(cardhaslabelsUrl,{idCard:props.cardId,idLabel:lab.id}).then(res=>{props.setCardHasLabelsByCardId([...props.cardHasLabelsByCardId,res.data]);props.updateLabels(lab,1)}).catch(err=>alert(err));
  }
  function detachLabel(lab)
  {
    axios.delete(cardhaslabelsUrl+deleteEnd+props.cardId+"/"+lab.id).then(res=>{console.log(res.data);props.setCardHasLabelsByCardId(props.cardHasLabelsByCardId.filter(l=>l.idLabel!==lab.id));props.updateLabels(lab,2)}).catch(err=>console.log(err))
  }

  return (
    <div>
      <Dialog open={props.open}  onKeyDown={(e)=>{ 
              if(e.key=="Escape")
              {   
                  e.preventDefault();
                  cancle();
              }}}>
        <DialogTitle>Add Label</DialogTitle>
        <DialogContent>
        <div>
         {
           props.labelThumnail.map(lab=><LabelThumbnail name={lab.name} color={lab.color} lab={lab} check={checkFunction(lab)} cardId={props.cardId} 
           setCardHasLabelsByCardId={props.setCardHasLabelsByCardId} attachLabel={attachLabel} detachLabel={detachLabel}/>)
         }
         </div>
          <DialogContentText className={classes.label}>
          Create Label :
          </DialogContentText>
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
                  handleAdd();

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
          <Button onClick={()=>handleAdd()}>ADD</Button>
        </DialogActions>
         <CirclePicker onChangeComplete={pickColor}/>
      
        </DialogContent>
       
      </Dialog>
    </div>
  );
}