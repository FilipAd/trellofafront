import List from "./List";
import styled from "styled-components";
import React, { useState,} from "react";
import axios from 'axios';
import { cardsUrl,boardsUrl,listsUrlEnd, boardsUrlEnd, loginEnd, labelsUrl, membersUrl, labelsEnd, boardHasMembersUrl } from "../../URLs";
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {makeStyles,fade} from "@material-ui/core/styles";
import Background from "../../background6.jpg"
import {Button,Avatar,Paper} from "@material-ui/core";
import { Redirect,Link } from "react-router-dom";
import InviteDialog from "../InviteDialog";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';


const ListContainer = styled.div
  `
display:flex;
flex-direction:row;
`;
const useStyle = makeStyles((theme) =>({

  root:
  {
 /* width:"100%",
  height:"100vw",
 // background:"lightgrey",
  backgroundSize:"cover",
  backgroundImage:`URL(${Background})`,
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",*/
  //overflowX:"scroll",

  width:"500%", //500%
  height:"100vw",
 // background:"lightgrey",
  backgroundSize:"500%", //500%
  backgroundImage:`URL(${Background})`,
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
  },
  line:
  {
    background:"#143e80",
    height:"50px",
    width:"100%", 
    display:"flex",
    flexDirection:"row",
    marginLeft:"5px",
    textAlign:"left",
  


  },
  logo:{
    fontSize:"30px",
    color:"#84b0f5",
    fontWeight:"bold",
    textShadow: "2px 0 0 white",
    fontFamily:"Lucida Handwriting",
   margin:theme.spacing(0.5,1,1,10),

  },
  link:
  {
    textDecoration:"none",
   
  },
  board:
  {
    fontSize:"30px",
    color:"white",
    fontFamily:"Arial",
    margin:theme.spacing(0.5,0,0,0),
  },
  avatar:
  {
    textAlign:"right",
    height:"40px",
    width:"40px",
    align:"right",
    margin:theme.spacing(0.5,2,2,1),
   

  },
  username:{
    fontSize:"30px",
    color:"white",
    margin:theme.spacing(0.5,2,2,1),
    fontFamily:"Arial",
    textAlign:"right"
    
  },
  lists:{
    minHeight:"5px",
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
    },
 
},
buttonInvite:{
  textDecoration:"none",
  align:"left",
  margin:theme.spacing(1,1,1,20),
background:"#f2f98d",

color:"black",
  "&:hover":{
    background:fade("#b9ebea",0.75),
    color:"white",
  },

},

}))

// setList(res.data)});

export default function RouteList(props) {
  
  let configToken=null;
  let idLogMember=0;
  let userFromStorage=JSON.parse(localStorage.getItem("user"));
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    idLogMember=JSON.parse(localStorage.getItem("user")).id;
    }
  const classes=useStyle();
  const [board,setBoard]=useState(null);
  const [lists, setList] = useState([]);
  const [redirectToLogin,setRedirectToLogin]=useState(false);
  const [redirectToBoards,setRedirectToBoards]=useState(false);
  const[openDialog,setOpenDialog]=useState(false);
  let [labelThumnail,setLabelThumbnail]=useState([]);
  let[membership,setMembership]=useState(false);



  function checkIfMember(result) {
    console.log(result);
    if (result !== null && result.data.length > 0)
    {   
      setMembership(false);
    }
    else
    {
      
      setMembership(true);
    }
     
}

/*

function deleteCard(id,listPom) 
{
    let updatedLsts=[];
    let updatedCards=listPom.cards.filter(card=>card.id!==id);
    updatedCards.map(card => {
        if (card.dndIndex > listPom.cards.filter(card=>card.id==id)[0].dndIndex) {
          card.dndIndex--;
          axios.put(cardsUrl + card.id, card,configToken).then((result) => { console.log('result' + result) });
        }
      })

   for(let i=0;i<lists.length;i++)
   {
       
       if(lists[i].id==listPom.id)
       {
           let newLst=listPom;
           newLst.cards=updatedCards;
           updatedLsts.push(newLst);
       }
       else
       updatedLsts.push(lists[i]);

   }
 //  const remainingCards = listcards.filter(card => id !== card.id);
 //  console.log(remainingCards);
 //  setCards(remainingCards);
  setList(updatedLsts);
}
*/


React.useEffect(() => { axios.get(boardHasMembersUrl+idLogMember+"/"+props.boardId,configToken).then(res=>setMembership(checkIfMember(res))).catch(err=>alert(err)); }, []);

  React.useEffect(() => { axios.get(membersUrl+JSON.parse(localStorage.getItem("user")).id+labelsEnd,configToken).then(res => {setLabelThumbnail(res.data);}); }, []);

  function handleLogout()
    {
        localStorage.removeItem("user");
        setRedirectToLogin(true);
    }
    

  
  React.useEffect(() => { axios.get(boardsUrl+props.boardId+listsUrlEnd,configToken).then(res => {setList(res.data); console.log(res.data);props.setBoardId(props.boardId) }); }, []);
  React.useEffect(() => { axios.get(boardsUrl+props.boardId,configToken).then(res => setBoard(res.data.name)); },[]);

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
  if(membership)
  {
    return <Redirect to="/404"/>
  }
  return (
    <div className={classes.root}>
      <div className={classes.line}>
      <Link to={boardsUrlEnd} className={classes.link}>
        <Button className={classes.button}>Back to boards</Button>
        </Link>
      
    
      
      
        <div className={classes.board}><DashboardIcon/>Board: {board}</div>
        <div className={classes.logo}>TrelloFA</div>
        <Button className={classes.buttonInvite} onMouseDown={()=>setOpenDialog(true)} >Invite</Button>   
        <Button className={classes.button} onMouseDown={()=>handleLogout()}>Logout</Button>
        <Avatar className={classes.avatar}><PersonOutlineIcon/></Avatar>
      <div className={classes.username}>{JSON.parse(localStorage.getItem("user")).username}</div>
      
        <InviteDialog open={openDialog} setOpenDialog={setOpenDialog}/>
      </div>
      
    <DragDropContext onDragEnd={onDragEnd} className={classes.lists}>
      <ListContainer>
        {
          lists.map((list) => (<List  list={list} key={list.id} onDragEnd={onDragEnd} setList={setList} lists={lists} labelThumnail={labelThumnail} setLabelThumbnail={setLabelThumbnail}/>))
        }
        <InputContainer type={"list"} setList={setList} lists={lists} />
      </ListContainer>
    </DragDropContext>
    </div>
  )

}