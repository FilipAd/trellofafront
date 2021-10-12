import React,{useState} from "react";
import {Paper,IconButton,Collapse,Badge} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import axios from "axios";
import EditCard from "./Input/EditCard";
import {cardHasLabelsByCardIdUrl, cardhaslabelsUrl, cardsUrl, commentEnd, commentUrl, labelsEnd, labelsUrl} from "../URLs";
import Label from "./Label";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from "react-bootstrap";
import AddLabelDialog from "./AddLabelDialog";
import CardComments from "./CardComments";
import YesNoCardDeleteDialog from "./YesNoCardDeleteDialog";



const useStyle = makeStyles((theme) =>({
    card:{
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
        overflowX:"scroll",
    }, 
    icons:
    {
        height:"35px",
        width:"35px"
    }
}))







export default function Card(props)
{

    let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }
    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const [openLabelDialog,setOpenLabelDialog]=useState(false);
    const [openCommentDialog,setOpenCommentDialog]=useState(false);
    const [openYesNoDialog,setOpenYesNoDialog]=useState(false);
    const [labels,setLabels]=useState([]);
    let [comments,setComments]=useState([]);
    
    let [cardHasLabelsByCardId,setCardHasLabelsByCardId]=useState([]);

    
    React.useEffect(() => { axios.get(cardHasLabelsByCardIdUrl+props.card.id,configToken).then(res => {setCardHasLabelsByCardId(res.data);}); }, []);
    React.useEffect(() => { axios.get(cardsUrl+props.card.id+labelsEnd,configToken).then(res => {setLabels(res.data); }); }, []);
    React.useEffect(() => { axios.get(cardsUrl+props.card.id+commentEnd,configToken).then(res => {setComments(res.data) }); }, []);
    
    

 
    function handleDelete(id)
    {
       
        axios.delete(cardsUrl+id,configToken)
        .then(response => console.log(response));
        props.deleteCard(id);
       
       

    }

    function addLabel(reqLabel)
    {
        axios.post(labelsUrl,reqLabel,configToken).then(res=>{;props.setLabelThumbnail([...props.labelThumnail,res.data])}).catch(err=>alert("error"));

    }

    function updateLabels(lab,action)
    {
        if(action===1)
        setLabels([...labels,lab]);
        else if(action===2)
        setLabels(labels.filter(l=>l.id!==lab.id));
        
    }

    function deleteComment(commentReq)
    {
      axios.delete(commentUrl+commentReq.id,configToken).then(res=>console.log("ok")).catch(err=>alert("error"));
      setComments(comments.filter(com=>com.id!==commentReq.id));  
    }

    function editComment(newComment)
   {
       let updatedComments=[];
       for(let i=0;i<comments.length;i++)
       {
            if(comments[i].id===newComment.id)
            {
                comments[i].text=newComment.text;
                
            }
            updatedComments.push(comments[i]);
       }
       setComments(updatedComments);
   }
   

    return(
        <div>
            <AddLabelDialog open={openLabelDialog} setOpenDialog={setOpenLabelDialog} cardId={props.card.id} addLabel={addLabel} setLabelThumbnail={props.setLabelThumbnail} 
            labelThumnail={props.labelThumnail} setCardHasLabelsByCardId={setCardHasLabelsByCardId} cardHasLabelsByCardId={cardHasLabelsByCardId}
            updateLabels={updateLabels}/>
            <CardComments open={openCommentDialog} setOpenCommentDialog={setOpenCommentDialog} comments={comments} setComments={setComments} cardId={props.card.id} deleteComment={deleteComment}
            editComment={editComment}/>
           <YesNoCardDeleteDialog open={openYesNoDialog} setOpenYesNoDialog={setOpenYesNoDialog} handleDelete={handleDelete} cardId={props.card.id} />
            <Collapse in={!open}>
            <Paper className={classes.card}>
            {props.card.description}
            <div>
            
            
            <IconButton  onMouseDown={()=>setOpen(!open)} className={classes.icons}>
            <Tooltip title="Edit Card">
                <EditIcon  fontSize="small"/>
            </Tooltip>
            </IconButton>
            
            
            <IconButton onMouseDown={()=>setOpenYesNoDialog(true)} className={classes.icons}>
            <Tooltip title="Delete Card">
                <DeleteIcon  fontSize="small"/>
            </Tooltip>
            </IconButton>
           
            
            <IconButton onMouseDown={()=>setOpenLabelDialog(true)} className={classes.icons}>
            <Tooltip title="Add Label">
                <AddBoxIcon  fontSize="small"/>
            </Tooltip>
            </IconButton>

            <IconButton onMouseDown={()=>setOpenCommentDialog(true)} className={classes.icons}>
            <Tooltip title="Comments">
                <CommentIcon fontSize="small"/>
            </Tooltip>
            </IconButton>
           
            <div>
                {
                   labels.map((lab)=>(<Label key={lab.id} color={lab.color}/>))
                }
            </div>
            </div>
            </Paper>
            </Collapse>
            <Collapse in={open}>
            <EditCard setOpen={setOpen} description={props.card.description} cardId={props.card.id} listId={props.listId} editCard={props.editCard} cardIndexDND={props.card.dndIndex} />
            </Collapse>
        </div>
    );
}