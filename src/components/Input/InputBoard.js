import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {InputBase} from "@material-ui/core";


const useStyle = makeStyles((theme) =>({
    createInput : {
        width: "400px",
        fontSize: "22px",
        background:"#f0f0f0",
        padding: "10px",
        boxSizing: "borderBox",
        borderRadius: "3px",
        border: "solid",
        outlineColor: "blue",
        boxShadow: "0 6px 6px grey",
        alignSelf: "center",
        },

}))
export function InputBoard(props)
{
const classes=useStyle();
let [boardTitlePom,setBoardTitlePom]=useState("");

function handleOnChange(e)
{
    setBoardTitlePom(e.target.value);
}
function handleCreateBoardPom()
{
    props.handleCreateBoard(boardTitlePom);
}

    return(<InputBase
        className={classes.createInput}
      placeholder="Your boards title..."
      type="text"
      onChange={handleOnChange}
      onKeyDown={(e)=>{  if(e.key=="Enter")
                            {   
                                e.preventDefault();
                                handleCreateBoardPom();
                            } 

                    }}/>
        
    );
}