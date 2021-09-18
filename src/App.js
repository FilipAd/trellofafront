
import List from "./components/List/List";
import styled from "styled-components";
import React,{ useState , Component} from "react";
import axios from 'axios';
import {Button} from "@material-ui/core"
import RouteList from './components/List/RouteList';
import InputContainer from "./components/Input/InputContainer";
import Board from './components/Board/Board';
import RouteBoard from "./components/Board/RouteBoard";
import Login from "./Login";
//import { Router } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";




const ListContainer=styled.div
`
display:flex;
flex-direction:row;
`;

export default function App() 
{
  return(

    <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/sign-in" component={Login} />
      <Route path="/lists" render={(props) => <RouteList test={"test1111111"}/> } />
      <Route path="/boards" component={RouteBoard} />  
    </Switch>
    </Router>
  
 /*  <div>
      <BoardRoute/>
    </div>*/
  
 /* <div>
  <ListContainer>
    <RouteListe/>
  </ListContainer>
  </div>*/
 /* <div><Login/></div>*/
  );
  
}


/* lists=
  [
          {
            id:"list-1",
            name:"prva lista",
            cards:[
              {
              id:"card-1",
              text:"tekst za prvu kartu sdad adsadasdasdas sdasd asd asd as dsa das das das sda ssadasdasdasfsdgr",
              },
              {
              id:"card-2",
              text:"tekst za drugu kartu dsadasd",
              },
            ],
          },
          {
            id:"list-2",
            name:"druga lista",
            cards:[{
              id:"card-3",
              text:"tekst za prvu kartu druga lista",
              },
              {
              id:"card-4",
              text:"tekst za drugu kartu druga lista",
              },
            ],
          },
          {
            id:"list-3",
            name:"treca lista",
            cards:[{
              id:"card-5",
              text:"tekst za prvu kartu treca lista",
              },
              {
              id:"card-6",
              text:"tekst za drugu kartu treca lista",
              },
            ],
          },
  ];
[l,setLists]= useState(lists);
getAll=()=>{
  axios.get(`http://localhost:9090/lists`).then(res=>{
    console.log(res);
    this.setLists({l:res.data});
  });
}*/