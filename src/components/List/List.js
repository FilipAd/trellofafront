import React from "react";
import {Paper,Typography,CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card";
import InputContainer from "../Input/InputContainer";
import { findByLabelText } from "@testing-library/dom";

const useStyle = makeStyles((theme) =>({
    root: {
        width : '300px',
        background:"#EBECF0",
        marginLeft:theme.spacing(1),
        marginTop:theme.spacing(1),
    },
}))
export default function List({list})
{
    
    const classes=useStyle();
    return(
    <div>
        <Paper className={classes.root}>
            <CssBaseline/>
             <Title title={list.title}/>
             {list.cards.map((card)=>(
                 <Card key={card.id} card={card} list={list}/>
             ))}
             <InputContainer/>
              
        </Paper>
    </div>
    );
}