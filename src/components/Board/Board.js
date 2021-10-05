import React, { useState } from "react";
import {Paper,IconButton,InputBase,Collapse} from "@material-ui/core";
import {makeStyles,fade} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {boardsUrl,listsUrlEnd,boardsUrlEnd, boardHasMembersUrl, deleteEnd} from "../../URLs";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { BrowserRouter as Router, Link } from "react-router-dom";




const useStyle = makeStyles((theme) =>({

    root:
    {
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
        overflow:"hidden",
        width : '40%',
        background:"#467e83",
        borderRadius:"30px",
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1),
        boxShadow: "0 10px 6px #5a6566",
    },
    link:
    {
        multiline: "true",
        fontSize:"25px",
        color:"#e4eced",
        width:"40%",
        borderRadius:"20px",
        "&:hover":{
            background:fade("#79a1a5",0.75),
        },
    },
    button:
    {
        color:"#2a4b4e",
    },
    
}))
export default function Board(props)
{
    
    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const [boardTitle,setBoardTitle]=useState(props.board.name);

    let userFromStorage=JSON.parse(localStorage.getItem("user"));
    let configToken=null;
    if(userFromStorage!==null)
    {
    configToken={ headers: {Authorization:"Bearer "+userFromStorage.token}};
    }

    function handleOnChange(e) 
    {
        
        setBoardTitle(e.target.value);
    }

    function handleDelete(id)
    {
        var answer=window.confirm("Delete Board ?");
        if(answer)
        {
        let updatedBoards=props.boards.filter(board=>board.id!==id);
        axios.delete(boardHasMembersUrl+deleteEnd+JSON.parse(localStorage.getItem("user")).id+"/"+id,configToken).then(props.setBoard(updatedBoards)).catch(err=>{alert("Error")});
        }
        
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
        axios.put(boardsUrl+boardId,updatedBoard,configToken).then(res=>{
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
        <div className={classes.root}>
            <Collapse in={!open}>  
            <Paper className={classes.board}>
            <Link className={classes.link} to={boardsUrlEnd+props.board.id+listsUrlEnd} onMouseDown={()=>{localStorage.setItem("boardId",props.board.id);props.setBoardId(props.board.id)}}> {props.board.name} </Link>
            <div className={classes.button}>
            <IconButton className={classes.button}  onMouseDown={()=>openEditForm(props.board.id)}>
                <EditIcon/>
            </IconButton>
            <IconButton  className={classes.button} onMouseDown={()=>handleDelete(props.board.id)}>
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
                    confirmEdit(props.board.id);  
                } 
                else if(e.key=="Escape")
                {
                    e.preventDefault();
                    setOpen(!open);
                }
            }}
            onChange={handleOnChange}
            multiline 
            value={boardTitle}
            fullWidth
           />   
        <div>
        <IconButton onMouseDown={()=>{confirmEdit(props.board.id)}}>
                <CheckIcon/>
        </IconButton>
        <IconButton onMouseDown={()=>{setOpen(!open)}}>
                <ClearIcon/>
        </IconButton>
        
        </div>
            </Paper>
            </Collapse>

        </div>
               
       
        );

}