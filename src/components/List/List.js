import React, { useState } from "react";
import {Paper,Typography,CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card";
import InputContainer from "../Input/InputContainer";

const useStyle = makeStyles((theme) =>({
    root: {
        width : '300px',
        background:"#EBECF0",
        marginLeft:theme.spacing(1),
        marginTop:theme.spacing(1),
    },
}))
export default function List(props)
{
    
    const classes=useStyle();
    const [cards, setCards] = useState(props.list.cards);
    const [titles,setTitle]= useState(props.list.name)

    function addCard(card) {
        let newCards = [...cards, card];
        setCards(newCards);
    }

    function deleteCard(id)
    {
        const remainingCards=cards.filter(card => id !== card.id);
        setCards(remainingCards);
    }

    function editCard(card)
    {
        const newCards=[];
        cards.map(el=>{
            if(el.id===card.id)
            {
                el.description=card.description;
                newCards.push(el);
            }
            else
            newCards.push(el);
        });
        setCards(newCards)
    }

    return(
    <div>
        <Paper className={classes.root}>
            <CssBaseline/>
             <Title title={titles} setTitle={setTitle} listId={props.list.id} idBoard={props.list.idBoard}/>
             {cards.map((card)=>(
                 <Card key={card.id} card={card} deleteCard={deleteCard} editCard={editCard} listId={props.list.id}/>
             ))}
             <InputContainer listId={props.list.id} addCard={addCard} type={"card"}/>
        </Paper>
    </div>
    );
}