import List from "./List";
import styled from "styled-components";
import React, { useState, Component } from "react";
import axios from 'axios';
import { Button } from "@material-ui/core"
import { listsUrl } from "../../URLs";
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const ListContainer = styled.div
  `
display:flex;
flex-direction:row;
`;


// setList(res.data)});

export default function RouteList(props) {
  const [lists, setList] = useState([]);
  React.useEffect(() => { axios.get(listsUrl).then(res => { setList(res.data); console.log(res.data) }); }, []);
  if (!lists) return null;

  const move = (source, destination, droppableSource, droppableDestination) => {
    console.log(source);
    console.log(destination);
    const sourceClone = Array.from(source);
    const destClone =
      droppableSource.droppableId === droppableDestination.droppableId
        ? sourceClone
        : Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getList = id => { 
    for(let i=0; i<lists.length; i++){
      let list = lists[i];
      console.log(list.id);
    if (list.id==id)
    return list.cards;
  } };
  const getListIndex = id => { 
    for(let i=0; i<lists.length; i++){
      let list = lists[i];
      console.log(list.id);
    if (list.id==id)
    return lists.indexOf(list);
  } };

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
    <ListContainer>
        {
          lists.map((list) => (<List list={list} key={list.id} onDragEnd={onDragEnd} />))
        
        
}
<InputContainer type={"list"} setList={setList} lists={lists} />
    </ListContainer>
  )

}