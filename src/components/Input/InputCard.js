import React, { useState } from 'react';
import {Paper,InputBase,Button,IconButton} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles, fade} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>({
    card:{  
        margin:theme.spacing(0,1,1,1),
        paddingBottom: theme.spacing(4),
        padding:theme.spacing(1,1,1,0),
    }, 
    input:{
        margin:theme.spacing(1),

    },
    btnConfirm:{
        background:"#5AAC44",
        color:"#fff",
        "&:hover":{
            background:fade("#5AAC44",0.75),
        }
    },
    confirm:{
        margin:theme.spacing(0,1,1,1),
    }
}));
//Paper prvi na koji se naidje je ustvari forma za unos teksta nove kartice
//Prima se {setOpen} iz InputContainera i pomocu njega se zatvara forma za unos nove kartice nakon pritiska ADD dugmeta
export default function InputCard({setOpen}){
    const classes=useStyle();
    return(
        <div>
            <div>
            <Paper className={classes.card}> 
            <InputBase multiline onBlur={ () => setOpen(false)}
            fullWidth
            inputProps={{
            className:classes.input,
            }}
            placeholder={
                "Enter a title of this card..."
            }
           />    
            </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onMouseDown={()=>setOpen(false)}>Add Card</Button>
                <IconButton onClick={()=>setOpen(false)}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    );
}