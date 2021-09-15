import logo from './logo.svg';
import './App.css';
import List from "./components/List/List";
import styled from "styled-components";
import React,{ useState , Component} from "react";
import axios from 'axios';

const api=axios.create({baseURL:`http://localhost:9090/lists`})

const ListContainer=styled.div
`
display:flex;
flex-direction:row;
`;

export default function  App ()
{
  
let response = [];
let lists = [];
// const [lists, setLists]= useState([]);
// axios.get(`http://localhost:9090/lists`).then(res=>{setLists({lists:res.data})});
axios.get(`http://localhost:9090/lists`).then(res=>(response.push(res.data)));
 
 console.log('1111');
 console.log(response);
 console.log('2222');
    


  const listList = lists.map(list => (<List list={list} key={list.id} />));
  console.log(listList)
  return {listList};
  /*
  return (   
  this.state.lists.map((list) => {
  return(
  <List list={list} key={list.id} />
  )
  }
  )); */
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