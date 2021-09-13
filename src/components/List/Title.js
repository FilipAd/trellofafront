import React, { useState } from "react";
import {Typography,InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const useStyle = makeStyles((theme) =>({
    root: {
        width : '300px',
        background:"#EBECF0",
        marginLeft:theme.spacing(1),
    },
    editableTitle:{
        flexGrow:1,
        fontSize:"1.2rem",
        fontWeight:"bold",
    },
    editableTitleContainer:{
        marginLeft: theme.spacing(1),
        display: "flex",
        fontSize:"1.2rem",
        fontWeight:"bold",
    },
    input:{
        margin:theme.spacing(1),
        "&:focus":{
            background:"#ddd",
        }
    }
}))
export default function Title({title})
{
    const classes=useStyle();
    const [open,setOpen]= useState(false);
    return ( 
        <div>
            {open?(
            <div>
                <InputBase value={title}
                autoFocus
                inputProps={{
                    className:classes.input
                }}
                fullWidth
                onBlur={()=>setOpen(!open)}
                />
            </div>
            ):(
            <div className={classes.editableTitleContainer}>
            <Typography onClick={()=>setOpen(!open)} className={classes.editableTitle}>{title}</Typography>
            <MoreHorizIcon/>
            </div> 
            )
        }
            
            
        </div>
    );
}