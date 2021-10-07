import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Button,FormLabel,FormGroup} from "@material-ui/core"
import "./Universal.css";
import Background from "../../background6.jpg"
import axios from "axios";
import {loginUrl,boardsUrlEnd, signUpEnd, signUpFrontUrl} from "../../URLs";
//import { Redirect,Link } from "react-router";
import { Redirect,Link} from "react-router-dom";


export default function Login(props) {

  const useStyle = makeStyles((theme) =>({

   

     
    button:
    {
      marginTop:"50px",
      marginLeft:"50px",
      width:"320px",
      alignSelf: "center",
      background:"#2897a2",
      padding: "20px",
      color:"#fff",
      "&:hover":{
          background:fade("#3BBFBF",0.75),
      }
    },
    root:
    {
      backgroundImage:`URL(${Background})`,
      width:"100%",
      height:"100vh",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      overflowX: "scroll",
    },
    label:
    {
      fontSize:"20px",
      fontFamily:"Lucida Handwriting",
      padding: "10px",
      color:"black",
      fontWeight:"bold",
      textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
    },

    title:{
      margineLeft:"100px",
      fontSize:"30px",
      fontFamily:"Lucida Handwriting",
      paddingLeft: "150px",
      textShadow: "2px 0 0 #d2d9db, -2px 0 0 #d2d9db, 0 2px 0 #d2d9db, 0 -2px 0 #d2d9db, 1px 1px #d2d9db, -1px -1px 0 #d2d9db, 1px -1px 0 #d2d9db, -1px 1px 0 #d2d9db",
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


  const [userName, setUsername] = useState("");
  const [passw, setPassword] = useState("");
  const [authenticationPassed,setAuthenticationPassed]=useState(false);

  function validateForm() {
    return userName.length > 0 && passw.length > 0;
  }

  function storeUser(user)
  {
    props.setUser(user);
    localStorage.setItem("user",JSON.stringify(user));

  }

  function handleSubmit(event) 
  {
    event.preventDefault();
    let credentials={username:userName,password:passw};
    axios.post(loginUrl,credentials).then(res=>{console.log(res.data);storeUser(res.data);setAuthenticationPassed(true)}).catch(function (error)
    {
      if(error.response.status===401)
      {
        alert("The user name or password is incorrect");
      }
      else
      {
        alert("The error occurred due to server problem.");
      }
    });
  }

 
   const classes=useStyle();

  if(authenticationPassed)
  {
    return <Redirect to={boardsUrlEnd} />
  }

  return (
    <div className={classes.root}>
    <div className="Login" >
      
      <Form onSubmit={handleSubmit}>
      <h1 className={classes.title}>Login :</h1>
        <FormGroup size="large" controlid="username">
          <FormLabel className={classes.label}>Username :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="large" controlid="password">
          <FormLabel className={classes.label}>Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={passw}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Link to={signUpFrontUrl} className={classes.link}>Create account</Link>
        <Button block size="large" type="submit" disabled={!validateForm()} className={classes.button} >
          Login
        </Button>
      </Form>
      </div>
    </div>
  );
}