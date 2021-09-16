import React,{useState} from "react";
import {Paper,IconButton,Collapse} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import EditCard from "./Input/EditCard";
import {cardsUrl} from "../URLs";




const useStyle = makeStyles((theme) =>({
    card:{
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
    } 
}))







export default function Card(props)
{

    const classes=useStyle();
    const [open,setOpen]=useState(false);

    function handleDelete(id)
    {
    axios.delete(cardsUrl+id)
       .then(response => console.log(response));
       props.deleteCard(id);
    }


    return(
        <div>
            <Collapse in={!open}>
            <Paper className={classes.card}>
            {props.card.description}
            <div>
            <IconButton  onMouseDown={()=>setOpen(!open)}>
                <EditIcon/>
            </IconButton>
            <IconButton onMouseDown={()=>handleDelete(props.card.id)}>
                <DeleteIcon/>
            </IconButton>
            </div>
            </Paper>
            </Collapse>
            <Collapse in={open}>
            <EditCard setOpen={setOpen} description={props.card.description} cardId={props.card.id} listId={props.listId} editCard={props.editCard} />
            </Collapse>
        </div>
    );
}