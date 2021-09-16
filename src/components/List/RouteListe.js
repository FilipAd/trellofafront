import List from "./List";
import styled from "styled-components";
import React,{ useState , Component} from "react";
import axios from 'axios';
import {Button} from "@material-ui/core"
import {listsUrl} from "../../URLs";


const ListContainer=styled.div
`
display:flex;
flex-direction:row;
`;


// setList(res.data)});

export default function RouteListe()
{
  const [lists,setList]=useState([]);
  React.useEffect(()=>{axios.get(listsUrl).then(res=>{setList(res.data);console.log(res.data)});},[]);
  if(!lists) return null;
 
  
  
  return (
  <ListContainer>
  {
  lists.map((list) => {
  return(<List list={list} key={list.id} />);
  }
  )
  }
  </ListContainer>   
  )

}