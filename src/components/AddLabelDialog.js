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



export default function InviteDialog(props) {

  let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

  const classes=useStyle();
  const [open, setOpen] = useState(false);
    let [result,setResult]=useState([]);
    const [pattern,setPattern]=useState(null);

    let[pomChb,setPomChb]=useState([]);
    

  

   
  
  
  
  function cancle()
  {
    props.setOpenDialog(false);
  }

  function handleAdd(labelText,colorLabel)
  {
    let newLabel={color:colorLabel,name:labelText,idMember:JSON.parse(localStorage.getItem("user")).id};
    props.addLabel(newLabel);
    
  }

  function checkFunction(lab)
  {
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
    axios.post(cardhaslabelsUrl,{idCard:props.cardId,idLabel:lab.id},configToken).then(res=>{props.setCardHasLabelsByCardId([...props.cardHasLabelsByCardId,res.data]);props.updateLabels(lab,1)}).catch(err=>alert(err));
  }
  function detachLabel(lab)
  {
    axios.delete(cardhaslabelsUrl+deleteEnd+props.cardId+"/"+lab.id,configToken).then(res=>{console.log(res.data);props.setCardHasLabelsByCardId(props.cardHasLabelsByCardId.filter(l=>l.idLabel!==lab.id));props.updateLabels(lab,2)}).catch(err=>console.log(err))
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
           props.labelThumnail.map(lab=><LabelThumbnail key={lab.id} name={lab.name} color={lab.color} lab={lab} check={checkFunction(lab)} cardId={props.cardId} 
           setCardHasLabelsByCardId={props.setCardHasLabelsByCardId} attachLabel={attachLabel} detachLabel={detachLabel}/>)
         }
         </div>
          <DialogContentText className={classes.label}>
          Create Label :
          </DialogContentText>

         <InputLabel handleAdd={handleAdd} cancle={cancle}/>

        
      
        </DialogContent>
       
      </Dialog>
    </div>
  );
}