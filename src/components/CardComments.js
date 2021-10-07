import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import InviteSearchResult from "./InviteSearchResult";
import axios from "axios";
import { cardsUrl, commentUrl, membersByUsernameUrl } from "../URLs";
import Comment from "./Comment";
import { InputComment } from "./Input/InputComment";

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


    
  
  function addComment(newText)
  {
    let user=JSON.parse(localStorage.getItem("user")).id;
    let card=props.cardId;
    axios.post(commentUrl,{idMember:user,idCard:card,text:newText},configToken).then(res=>props.setComments([...props.comments,res.data])).catch(err=>alert(err));
    
  }

  function cancle()
  {
    props.setOpenCommentDialog(false);
  }
  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Text
          </DialogContentText>

            <InputComment   cancle={cancle} addComment={addComment} />

         
          <div>All comments:</div>
          <div >
          {  
            props.comments.map((com)=>{ return <Comment key={com.id} comment={com} deleteComment={props.deleteComment}
            check={(com.idMember===JSON.parse(localStorage.getItem("user")).id)?false:true} editComment={props.editComment} /> })
          }
        </div>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}