import List from "./List";
import styled from "styled-components";
import React, { useState,} from "react";
import axios from 'axios';
import { cardsUrl,boardsUrl,listsUrlEnd } from "../../URLs";
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {makeStyles,fade} from "@material-ui/core/styles";
import Background from "../../background6.jpg"


const ListContainer = styled.div
  `
display:flex;
flex-direction:row;
`;
const useStyle = makeStyles((theme) =>({

  root:
  {
  width:"100%",
  height:"100vh",
  backgroundImage:`URL(${Background})`,
  }

}))

// setList(res.data)});

export default function RouteList(props) {
  const classes=useStyle();
  const [lists, setList] = useState([]);
  let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }
  React.useEffect(() => { axios.get(boardsUrl+localStorage.getItem("boardId")+listsUrlEnd,configToken).then(res => {setList(res.data); console.log(res.data);props.setBoardId(props.boardId) }); }, []);

  if (!lists) return null;

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    let destClone = null;
    if(droppableSource.droppableId === droppableDestination.droppableId){
      destClone = sourceClone;
    }
    else {
      destClone = Array.from(destination);
      removed.idList = droppableDestination.droppableId;
    }
    sourceClone.map(card => {
      if (card.dndIndex > removed.dndIndex) {
        card.dndIndex--;
        axios.put(cardsUrl + card.id, card).then((result) => { console.log('result' + result) });
      }
    })
    removed.dndIndex = droppableDestination.index;
    axios.put(cardsUrl + removed.id, removed).then((result) => { console.log('result' + result) });
    destClone.map(card => {
      console.log('destination: ' + card.dndIndex + ' > ' + removed.dndIndex);
      if (card.dndIndex >= removed.dndIndex) {
        card.dndIndex++;
        axios.put(cardsUrl + card.id, card).then((result) => { console.log('result' + result) });
      }
    })
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getList = id => {
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      console.log(list.id);
      if (list.id == id)
        return list.cards;
    }
  };
  const getListIndex = id => {
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      console.log(list.id);
      if (list.id == id)
        return lists.indexOf(list);
    }
  };

  const onDragEnd = (result) => {
    // useEffect posalji newLists bazi
    const { source, destination } = result;
    console.log("vuuuuuuc");
    // dropped outside the list
    if (!destination) {
      console.log("nece ona nidje");
      return;
    }
    let change = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );
    let newLists = JSON.parse(JSON.stringify(lists));
    // console.log(change[source.droppableId]);
    console.log(change);
    newLists[getListIndex(source.droppableId)].cards = change[source.droppableId];
    newLists[getListIndex(destination.droppableId)].cards = change[destination.droppableId];
    setList(newLists);
  };

  return (
    <div className={classes.root}>
    <DragDropContext onDragEnd={onDragEnd}>
      <ListContainer>
        {
          lists.map((list) => (<List list={list} key={list.id} onDragEnd={onDragEnd} setList={setList} lists={lists} />))
        }
        <InputContainer type={"list"} setList={setList} lists={lists} />
      </ListContainer>
    </DragDropContext>
    </div>
  )

}