import React,{useState} from "react";
import {Paper,IconButton,Collapse,Badge} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import EditCard from "./Input/EditCard";
import {cardHasLabelsByCardIdUrl, cardhaslabelsUrl, cardsUrl, labelsEnd, labelsUrl} from "../URLs";
import Label from "./Label";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from "react-bootstrap";
import AddLabelDialog from "./AddLabelDialog";




const useStyle = makeStyles((theme) =>({
    card:{
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
        overflow:"hidden",
    }, 
    icons:
    {
        height:"40px",
        width:"40px"
    }
}))







export default function Card(props)
{

    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const [openDialog,setOpenDialog]=useState(false);
    const [labels,setLabels]=useState([]);
    
    let [cardHasLabelsByCardId,setCardHasLabelsByCardId]=useState([]);

    
    React.useEffect(() => { axios.get(cardHasLabelsByCardIdUrl+props.card.id).then(res => {setCardHasLabelsByCardId(res.data);}); }, []);
    React.useEffect(() => { axios.get(cardsUrl+props.card.id+labelsEnd).then(res => {setLabels(res.data); }); }, []);
    
    let userFromStorage=JSON.parse(localStorage.getItem("user"));
    let configToken=null;
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

    function handleDelete(id)
    {
    var answer=window.confirm("Delete Card ?");
        if(answer)
        {
        axios.delete(cardsUrl+id,configToken)
        .then(response => console.log(response));
        props.deleteCard(id);
        }

    }

    function addLabel(reqLabel)
    {
        axios.post(labelsUrl,reqLabel).then(res=>{alert("successful");props.setLabelThumbnail([...props.labelThumnail,res.data])}).catch(err=>alert("error"));

    }

    function updateLabels(lab,action)
    {
        if(action===1)
        setLabels([...labels,lab]);
        else if(action===2)
        setLabels(labels.filter(l=>l.id!==lab.id));
        
    }

   
   

    return(
        <div>
            <AddLabelDialog open={openDialog} setOpenDialog={setOpenDialog} cardId={props.card.id} addLabel={addLabel} setLabelThumbnail={props.setLabelThumbnail} 
            labelThumnail={props.labelThumnail} setCardHasLabelsByCardId={setCardHasLabelsByCardId} cardHasLabelsByCardId={cardHasLabelsByCardId}
            updateLabels={updateLabels}/>
            <Collapse in={!open}>
            <Paper className={classes.card}>
            {props.card.description}
            <div>
            
            
            <IconButton  onMouseDown={()=>setOpen(!open)} className={classes.icons}>
            <Tooltip title="Edit Card">
                <EditIcon/>
            </Tooltip>
            </IconButton>
            
            
            <IconButton onMouseDown={()=>handleDelete(props.card.id)} className={classes.icons}>
            <Tooltip title="Delete Card">
                <DeleteIcon/>
            </Tooltip>
            </IconButton>
           
            
            <IconButton onMouseDown={()=>setOpenDialog(true)} className={classes.icons}>
            <Tooltip title="Add Label">
                <AddBoxIcon/>
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