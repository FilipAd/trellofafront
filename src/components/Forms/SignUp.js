import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Paper,InputBase,Button,IconButton,FormLabel,FormGroup,FormControl} from "@material-ui/core"
import "./Universal.css";
import axios from "axios";
import {signUpUrl,loginEnd} from "../../URLs";
import { Redirect,Link} from "react-router-dom";
import Background from "../../background6.jpg"
import Login from "./Login";


export default function SignUp()
 {
  const [fullName, setFullName] = useState("");
  const [userName,setUsername]=useState("");
  const [passw, setPassword] = useState("");
  const [redirect,setRedirect]=useState(false);


  function validateForm() 
  {
    return userName.length > 0 && passw.length > 0 && fullName.length > 0;
  }

  function handleSubmit(event) 
  {
    event.preventDefault();
  }

  function createUser()
  {
    let user={fullname:fullName,username:userName,password:passw};
    
    axios.post(signUpUrl,user).then(()=>{setRedirect(true)}).catch(function (error)
    {
      if(error.response.status)
      {
        alert("This username is already taken. Please choose another name.");
      }
      else
      alert("The error occurred due to server problem.");
    });

  }

  const useStyle = makeStyles((theme) =>({

    Login : {
        padding:"60px 0",
       },
       form :
       {
        margin: "0 auto",
        maxWidth: "320px",
      },
      button:
      {
        marginTop:"50px",
        marginLeft:"50px",
        width:"320px",
        alignSelf: "center",
        background:"#2897a2",
        padding: "20px",
        boxShadow: "0 2px 4px grey",
        color:"#fff",
        "&:hover":{
            background:fade("#3BBFBF",0.75),
        }
      },
      label:
      {
        fontSize:"20px",
        fontFamily:"Lucida Handwriting",
        padding: "10px",
        color:"black",
        textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
        fontWeight:"bold",
      },
      root:
      {
        backgroundImage:`URL(${Background})`,
        width:"100%",
        height:"100vh",
      },
      title:{
        margineLeft:"100px",
        fontSize:"30px",
        fontFamily:"Lucida Handwriting",
        textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
        paddingLeft: "150px",
      },
      link:{
        color:"yellow",
        margineLeft:"100px",
        fontSize:"21px",
        paddingLeft:"10px",
        textShadow: "0 0 5px black",
        "&:hover":{
          color:"#3345ff"
      },

      },
      createInput : {
        margine:"10 10 10 10",
        width: "400px",
        height: "30px",
        fontSize: "22px",
        padding: "10px",
        boxSizing: "borderBox",
        borderRadius: "3px",
        border: "none",
        outlineColor: "blue",
        boxShadow: "0 2px 4px grey",
        alignSelf: "center",
        },
   }))
   const classes=useStyle();

   if(redirect==true)
   {
     return <Redirect to={loginEnd}/>
   }

  return (
    <div className={classes.root}>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <h1 className={classes.title}>Sign-up:</h1>

        <FormGroup size="lg" controlId="fullname">
          <FormLabel className={classes.label}>Full Name :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>

        <FormGroup size="lg" controlId="username">
          <FormLabel className={classes.label}>Username : </FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup size="lg" controlId="password">
          <FormLabel className={classes.label}>Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={passw}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Link to={loginEnd} className={classes.link}>Already have an account? Sign in</Link>
        <Button block size="lg" type="submit" disabled={!validateForm()} className={classes.button} onMouseDown={()=>createUser()}>
          CREATE
        </Button>
      </Form>
    </div>
    </div>
  );
}