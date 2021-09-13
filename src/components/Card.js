import React from "react";
import {Paper,IconButton} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const useStyle = makeStyles((theme) =>({
    card:{
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
    } 
}))

export default function Card({card,list})
{
    const classes=useStyle();
    return(
        <div>
            <Paper className={classes.card}>{card.text}
            <div>
            <IconButton onClick={()=>alert(card.id)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={()=>{alert(card.id)}}>
                <DeleteIcon/>
            </IconButton>
            </div>
            </Paper>
        </div>
    );
}