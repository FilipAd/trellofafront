import React, { useState } from "react";
import {Paper,Typography,CssBaseline,IconButton,InputBase,Collapse} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { withTheme } from "styled-components";
import { findAllInRenderedTree } from "react-dom/test-utils";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {boardsUrl} from "../../URLs";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';



const useStyle = makeStyles((theme) =>({

    root:
    {
        bacground:"red",
        align:"center",
    },
    board: {
    /*    display:"flex",
        fontSize:"20px",
        
       ,
        marginLeft:theme.spacing(1),
        marginTop:theme.spacing(1),
        color:"white",
       
        justifyContent:"center",
        fontFamily:"Lucida Handwriting",*/
        
        color:"white",
        fontSize:"20px",
        multiline:"true",
        width : '60%',
        height:'60px',
        background:"#80cbc4",
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
    },
    
}))
export default function Board(props)
{
    
    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const [boardTitle,setBoardTitle]=useState(props.board.name);

    function handleOnChange(e) 
    {
        
        setBoardTitle(e.target.value);
    }

    function handleDelete(id)
    {
      
        let updatedBoards=props.boards.filter(board=>board.id!==id);
        axios.delete(boardsUrl+id).then(props.setBoard(updatedBoards)).catch(err=>{alert("Error")});
        
    }

    function openEditForm(id)
    {
        setOpen(!open);
        setBoardTitle(props.board.name);

    }

    function confirmEdit(boardId)
    {
        let updatedBoard={id:boardId,name:boardTitle,idOrganization:1};
        let newBoards=[];
        axios.put(boardsUrl+boardId,updatedBoard).then(res=>{
            for(let i=0;i<props.boards.length;i++)
            {
                if(props.boards[i].id==boardId)
                {
                    props.boards[i].name=res.data.name;
                    newBoards.push(props.boards[i]);
                }
                else
                newBoards.push(props.boards[i]);

            }
            props.setBoard(newBoards);
            setOpen(!open);
        }).catch(()=>alert("error"))
         
    }

  
    
    return(
        <div>
            <Collapse in={!open}>  
            <Paper className={classes.board}>
                {props.board.name} 
            <div>
            <IconButton  onMouseDown={()=>openEditForm(props.board.id)}>
                <EditIcon/>
            </IconButton>
            <IconButton onMouseDown={()=>handleDelete(props.board.id)}>
                <DeleteIcon/>
            </IconButton>
            </div>
            </Paper>
            </Collapse>

            <Collapse in={open}>
            <Paper className={classes.board}> 
            <InputBase
            onKeyDown={(e)=>{ 
                 if(e.key=="Enter")
                    {   
                        e.preventDefault();
                        alert("Potvrda");
                    }
            }}
            onChange={handleOnChange}
            multiline 
            value={boardTitle}
            fullWidth
           />   
        <div>
        <IconButton onMouseDown={()=>{setOpen(!open)}}>
                <ClearIcon/>
        </IconButton>
        <IconButton onMouseDown={()=>{confirmEdit(props.board.id)}}>
                <CheckIcon/>
        </IconButton>
        </div>
            </Paper>
            </Collapse>

        </div>
               
       
        );

}