import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {makeStyles,fade} from "@material-ui/core/styles";
import {Paper,InputBase,Button,IconButton,FormLabel,FormGroup,FormControl} from "@material-ui/core"
import "./Universal.css";
import Background from "../../background6.jpg"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

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
      },
      label:
      {
        fontSize:"20px",
        fontFamily:"Lucida Handwriting",
        padding: "10px",
        color:"black",
      },

      title:{
        margineLeft:"100px",
        fontSize:"30px",
        fontFamily:"Lucida Handwriting",
        paddingLeft: "150px",
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

  return (
    <div className={classes.root}>
    <div className="Login" >
      
      <Form onSubmit={handleSubmit}>
      <h1 className={classes.title}>Login :</h1>
        <FormGroup size="lg" controlId="username">
          <FormLabel className={classes.label}>Username :</FormLabel>
          <Form.Control
            className={classes.createInput}
            autoFocus
            type="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="lg" controlId="password">
          <FormLabel className={classes.label}>Password :</FormLabel>
          <Form.Control
            className={classes.createInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button block size="lg" type="submit" disabled={!validateForm()} className={classes.button}>
          Login
        </Button>
      </Form>
      </div>
    </div>
  );
}