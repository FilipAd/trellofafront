import React,{useState} from "react";
import {Paper,IconButton,Collapse} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import EditCard from "./Input/EditCard";

export const link='http://localhost:9090/cards/';



const useStyle = makeStyles((theme) =>({
    card:{
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
    } 
}))

function handleDelete(id)
{
    alert("ovo se brise"+id);
    axios.delete(link+id);
}

function handleEdit(id)
{
    alert("ovo se edituje"+id);
    axios.put(link+id);
}



export default function Card(props)
{
    const classes=useStyle();
    const [open,setOpen]=useState(false);

    return(
        <div>
            <Collapse in={!open}>
            <Paper className={classes.card}>
            {props.card.description}
            <div>
            <IconButton>
                <EditIcon onMouseDown={()=>alert(props.card.id)}/>
            </IconButton>
            <IconButton onMouseDown={()=>handleDelete(props.card.id)}>
                <DeleteIcon/>
            </IconButton>
            </div>
            </Paper>
            </Collapse>
            <Collapse in={open}>
            <EditCard/>
            </Collapse>
        </div>
    );
}