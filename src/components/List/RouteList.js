import List from "./List";
import styled from "styled-components";
import React, { useState,} from "react";
import axios from 'axios';
import { cardsUrl,boardsUrl,listsUrlEnd, boardsUrlEnd, loginEnd, labelsUrl, membersUrl, labelsEnd } from "../../URLs";
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {makeStyles,fade} from "@material-ui/core/styles";
import Background from "../../background6.jpg"
import {Button} from "@material-ui/core";
import { Redirect,Link } from "react-router-dom";
import InviteDialog from "../InviteDialog";


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
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
  backgroundSize:"cover",
  },
  line:
  {
    background:"#0c5faa",
    height:"50px",
    textAlign:"right",
    width:"100%", 
  },
  link:
  {
    textDecoration:"none"
  },
  button:{
    textDecoration:"none",
    align:"left",
    margin:theme.spacing(1,1,1,1),
  background:"#f2f98d",

  color:"black",
    "&:hover":{
      background:fade("#b9ebea",0.75),
      color:"white",
    }
},

}))

// setList(res.data)});

export default function RouteList(props) {
  const classes=useStyle();
  const [lists, setList] = useState([]);
  const [redirectToLogin,setRedirectToLogin]=useState(false);
  const [redirectToBoards,setRedirectToBoards]=useState(false);
  const[openDialog,setOpenDialog]=useState(false);
  let [labelThumnail,setLabelThumbnail]=useState([]);
  React.useEffect(() => { axios.get(membersUrl+JSON.parse(localStorage.getItem("user")).id+labelsEnd).then(res => {setLabelThumbnail(res.data);}); }, []);

  function handleLogout()
    {
        localStorage.removeItem("user");
        setRedirectToLogin(true);
    }


  let configToken=null;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }
  React.useEffect(() => { axios.get(boardsUrl+props.boardId+listsUrlEnd,configToken).then(res => {setList(res.data); console.log(res.data);props.setBoardId(props.boardId) }); }, []);

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
        axios.put(cardsUrl + card.id, card,configToken).then((result) => { console.log('result' + result) });
      }
    })
    removed.dndIndex = droppableDestination.index;
    axios.put(cardsUrl + removed.id, removed,configToken).then((result) => { console.log('result' + result) });
    destClone.map(card => {
      console.log('destination: ' + card.dndIndex + ' > ' + removed.dndIndex);
      if (card.dndIndex >= removed.dndIndex) {
        card.dndIndex++;
        axios.put(cardsUrl + card.id, card,configToken).then((result) => { console.log('result' + result) });
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
      if (list.id == id)
        return list.cards;
    }
  };
  const getListIndex = id => {
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      if (list.id == id)
        return lists.indexOf(list);
    }
  };

  const onDragEnd = (result) => {
    // useEffect posalji newLists bazi
    const { source, destination } = result;
   // console.log("vuuuuuuc");
    // dropped outside the list
    if (!destination) {
  //    console.log("nece ona nidje");
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
    newLists[getListIndex(source.droppableId)].cards = change[source.droppableId];
    newLists[getListIndex(destination.droppableId)].cards = change[destination.droppableId];
    setList(newLists);
  };

  if(redirectToBoards)
  {
    return <Redirect to={boardsUrlEnd} />
  }

  if(redirectToLogin)
  {
    return <Redirect to={loginEnd}/>
  }
 
  return (
    <div className={classes.root}>
      <div className={classes.line}>
        <Button className={classes.button} onMouseDown={()=>setOpenDialog(true)} >Invite</Button>
        <Link to={boardsUrlEnd} className={classes.link}>
        <Button className={classes.button}>Back to boards</Button>
        </Link>
        <Button className={classes.button} onMouseDown={()=>handleLogout()}>Logout</Button>
        <InviteDialog open={openDialog} setOpenDialog={setOpenDialog}/>
      </div>
    <DragDropContext onDragEnd={onDragEnd}>
      <ListContainer>
        {
          lists.map((list) => (<List list={list} key={list.id} onDragEnd={onDragEnd} setList={setList} lists={lists} labelThumnail={labelThumnail} setLabelThumbnail={setLabelThumbnail}/>))
        }
        <InputContainer type={"list"} setList={setList} lists={lists} />
      </ListContainer>
    </DragDropContext>
    </div>
  )

}