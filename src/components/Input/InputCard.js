import React, { useState,useContext } from 'react';
import {Paper,InputBase,Button,IconButton} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles, fade} from "@material-ui/core/styles";
import axios from 'axios';

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
export default function InputCard(props){
    
    const classes=useStyle();
    const [cardDescription,setCardDescription]=useState('');

 //   const karta={description: cardDescription,idList:listId};

    const link='http://localhost:9090/cards/';

    function handleOnChange(e) {
        setCardDescription(e.target.value);
    }


    const handleBtnConfirm=() =>
    {
    const karta={description: cardDescription,idList:props.listId};
     axios.post(link,karta)
        .then(response => console.log(response));
       // alert(listId);
        setCardDescription(""); 
        props.addCard(karta);
        props.setOpen(false);
    };



    return(
        <div>
            <div>
            <Paper className={classes.card}> 
            <InputBase
            onChange={handleOnChange}
            multiline onBlur={ () => props.setOpen(false)}
            fullWidth
            value={cardDescription}
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
                <Button className={classes.btnConfirm} onMouseDown={handleBtnConfirm}>Add Card</Button>
                <IconButton onClick={()=>props.setOpen(false)}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    );
}