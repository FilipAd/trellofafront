import React, { useState } from "react";
import { Paper, CssBaseline,IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card";
import InputContainer from "../Input/InputContainer";
import DeleteIcon from '@material-ui/icons/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {listsUrl, cardsUrl, labelsUrl} from "../../URLs";
import axios from "axios";


const useStyle = makeStyles((theme) => ({
    root: {
        width: '300px',
        background: "#a7c2ee",
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}))
export default function List(props) {

    const classes = useStyle();
    const [cards, setCards] = useState(props.list.cards);
    const [titles, setTitle] = useState(props.list.name);

 
    let userFromStorage=JSON.parse(localStorage.getItem("user"));
    let configToken=null;
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

    function addCard(card) {
       let newCards = [...props.list.cards, card];
        let updatedLists= [];
        for(let i=0;i<props.lists.length;i++)
        {
            if(props.lists[i].id==props.list.id)
           {
               let newLst=props.list;
               newLst.cards=newCards;
               updatedLists.push(newLst);
           }
           else
           updatedLists.push(props.lists[i]);
        }
        props.setList(updatedLists);
    }

    function deleteCard(id) 
    {
        let updatedLsts=[];
        let updatedCards=props.list.cards.filter(card=>card.id!==id);
        updatedCards.map(card => {
            if (card.dndIndex > props.list.cards.filter(card=>card.id==id)[0].dndIndex) {
              card.dndIndex--;
              axios.put(cardsUrl + card.id, card,configToken).then((result) => { console.log('result' + result) });
            }
          })

       for(let i=0;i<props.lists.length;i++)
       {
           
           if(props.lists[i].id==props.list.id)
           {
               let newLst=props.list;
               newLst.cards=updatedCards;
               updatedLsts.push(newLst);
           }
           else
           updatedLsts.push(props.lists[i]);

       }
       const remainingCards = cards.filter(card => id !== card.id);
     //  console.log(remainingCards);
     //  setCards(remainingCards);
      props.setList(updatedLsts);
    }

    function editCard(card)
     {
         let updatedLists=[];
         for(let i=0;i<props.lists.length;i++)
         {
             if(props.lists[i].id===props.list.id)
             {
                for(let j=0;j<props.lists[i].cards.length;j++)
                {
                    if(props.list.cards[j].id==card.id)
                    {
                        props.list.cards[j].description=card.description;
                    }
                }
                updatedLists.push(props.lists[i]);
             }
             else
             updatedLists.push(props.lists[i]);
               
         }
         props.setList(updatedLists);
        

       /* const newCards = [];
        cards.map(el => {
            if (el.id === card.id) {
                el.description = card.description;
                newCards.push(el);
            }
            else
                newCards.push(el);
        });
        setCards(newCards)*/

    }

    function deleteList(id)
    {
        var answer=window.confirm("Delete List ?");
        if(answer)
        {
            let updatedLists=props.lists.filter(list=>list.id!==id);
            axios.delete(listsUrl+id,configToken).then(response => {console.log(response.data.id); props.setList(updatedLists);});
        }
    }

    return (
        <div>
            <Droppable droppableId={String(props.list.id)}>
                {(provided, snapshot) => (
                    <Paper className={classes.root}>
                        <CssBaseline />
                        <Title title={titles} setTitle={setTitle} listId={props.list.id} idBoard={props.list.idBoard} />
                        <div ref={provided.innerRef}>

                            {props.list.cards.sort(function(a, b){return a.dndIndex - b.dndIndex}).map((card, index) => (
                                <Draggable
                                    key={card.id}
                                    draggableId={String(card.id)}
                                    index={card.dndIndex}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Card key={card.id} card={card} deleteCard={deleteCard} editCard={editCard} listId={props.list.id}
                                            labelThumnail={props.labelThumnail} setLabelThumbnail={props.setLabelThumbnail} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </div>
                        <InputContainer listId={props.list.id} addCard={addCard} type={"card"} lists={props.lists} list={props.list}/>
                        <IconButton onMouseDown={()=>deleteList(props.list.id)}>
                        <DeleteIcon/>
                        </IconButton>
                    </Paper>
                )}
            </Droppable>
        </div>
    );
}