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

export default class RouteListe extends Component
{
  state={
  lists:[]
  }

  constructor()
  {
    super();
    axios.get(listsUrl).then(res=>{console.log(res.data); this.setState({lists:res.data})});
  }

render()
{
  return (   
  this.state.lists.map((list) => {
  return(<List list={list} key={list.id} />)
  }
  )
  )
}
}