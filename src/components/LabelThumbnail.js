import React, { useEffect, useState} from 'react';
import {Paper,InputBase,Button,IconButton,Checkbox} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles, fade} from "@material-ui/core/styles";
import axios from 'axios';
import { cardhaslabelsUrl } from '../URLs';


const useStyle = makeStyles((theme) =>({

    thumbnail:
    {
        width:"100%",
        height:"50%",
        marginTop:"10px",
    },
    check:
    {
        background:"white",
        width:"10px",
        height:"10px",
    }
}))




export default function LabelThumbnail(props) 
{

   let [checked,setChecked]=useState(props.check)

    function handleOnChange(e)
    {
        setChecked(e.target.checked);
        if(e.target.checked)
        {
           props.attachLabel(props.lab);
        }
        else
        {
            props.detachLabel(props.lab);
        }
    }
    
    const classes=useStyle();
    return(<div className={classes.thumbnail}>
        <Paper style={{background:`${props.color}`,color:"white",textAlign:"center"}}>{props.name} 
        <div>
        <Checkbox className={classes.check} checked={checked} onChange={handleOnChange}/>
        </div> 
        </Paper>
        </div>)
}