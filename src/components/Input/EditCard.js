import React, { useState} from 'react';
import {Paper,InputBase,Button,IconButton} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles, fade} from "@material-ui/core/styles";
import axios from 'axios';
import {cardsUrl} from "../../URLs";

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
export default function EditCard(props){
    
    const classes=useStyle();
    const [cardDescription,setCardDescription]=useState(props.description);

 //   const karta={description: cardDescription,idList:listId};


    function handleOnChange(e) {
        setCardDescription(e.target.value);
    }


    const handleBtnConfirm=() =>
    {
    const karta={description: cardDescription,idList:props.listId,id:props.cardId};
     axios.put(cardsUrl+props.cardId,karta)
        .then(response =>{console.log(response);props.editCard(response.data)});
       props.setOpen(true);  
    };



    return(
        <div>
            <div>
            <Paper className={classes.card}> 
            <InputBase
            onChange={handleOnChange}
            multiline 
            onBlur={ () => props.setOpen(false)}
            fullWidth
            value={cardDescription}
            inputProps={{
            className:classes.input,
            
            }}
           />   
            </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onMouseDown={handleBtnConfirm}>Confirm</Button>
                <IconButton onClick={()=>props.setOpen(false)}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    );
}