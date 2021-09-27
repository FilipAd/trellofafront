import React, { useState} from 'react';
import {Paper,InputBase,Button,IconButton} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles, fade} from "@material-ui/core/styles";
import axios from 'axios';
import {cardsUrl,listsUrl} from "../../URLs";

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
        background:"#286ad4 ",
        color:"white",
        "&:hover":{
            background:fade("#b9ebea",0.75),
            color:"black",
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
    const [listTitle,setListTitle]=useState('');

 //   const karta={description: cardDescription,idList:listId};


    function handleOnChange(e) 
    {
        
        (props.type==="list")?setListTitle(e.target.value):setCardDescription(e.target.value);
    }


    const handleBtnConfirm=() =>
    {
    if(props.type==="list")
    {
        
        var list={id:-1,name:listTitle,idBoard:localStorage.getItem("boardId"),cards:[]}; //OVOOOOOO PREPRAVITI KAD DODJU TABLE
        var newLists=[];
        axios.post(listsUrl,list)
        .then(response => {console.log(response.data.id);props.setList([...props.lists,response.data])});
   //     newLists=[...props.lists,list];
//    props.setList(newLists); 
        setListTitle("");
        
    }
    else if(props.type==="card")
    {
    console.log(props);
    let card={description: cardDescription,idList:props.listId,dndIndex:props.list.cards.length};//dndIndex:props.list.card.length
    console.log(props.listId);
    axios.post(cardsUrl,card)
        .then(response => {console.log(response);props.addCard(response.data)});
        setCardDescription(""); 
        props.setOpen(false);
    }
   
    };



    return(
        <div>
            <div>
            <Paper className={classes.card}> 
            <InputBase
            onChange={handleOnChange}
            multiline onBlur={ () => props.setOpen(false)}
            fullWidth
            value={(props.type==="list")?listTitle:cardDescription}
            inputProps={{
            className:classes.input,
            }}
            placeholder={
                (props.type==="list")?"Enter title of this list":"Enter a description of this card..."}
           />    
            </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onMouseDown={handleBtnConfirm}>{(props.type==="list")?"ADD LIST":"ADD CARD"}</Button>
                <IconButton onMouseDown={()=>props.setOpen(false)}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    );
}