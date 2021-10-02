import React,{useState} from "react";
import {Paper,IconButton,Collapse,Badge} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import EditCard from "./Input/EditCard";
import {cardsUrl} from "../URLs";
import Label from "./Label";




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

    function handlePom()
    {}

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
            <EditCard setOpen={setOpen} description={props.card.description} cardId={props.card.id} listId={props.listId} editCard={props.editCard} cardIndexDND={props.card.dndIndex} />
            </Collapse>
        </div>
    );
}