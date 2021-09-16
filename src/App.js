
import List from "./components/List/List";
import styled from "styled-components";
import React,{ useState , Component} from "react";
import axios from 'axios';
import {Button} from "@material-ui/core"
import RouteListe from './components/List/RouteListe';
import InputContainer from "./components/Input/InputContainer";
import Board from './components/Board/Board';
import BoardRoute from "./components/Board/RouteBoard";




const ListContainer=styled.div
`
display:flex;
flex-direction:row;
`;

export default function App() 
{
  return(
   <div>
      <BoardRoute/>
    </div>
  
 /* <div>
  <ListContainer>
    <RouteListe/>
    <InputContainer type={"list"} buttonTitle={"ADD LIST"}/>
  </ListContainer>
  </div>*/
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