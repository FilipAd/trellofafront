import React,{ useState ,} from "react";
import RouteList from './components/List/RouteList';
import RouteBoard from "./components/Board/RouteBoard";
import Login from "./components/Forms/Login";
import SignUp from "./components/Forms/SignUp";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";





export default function App() 
{

  const[user,setUser]=useState(null);
  const [boardId,setBoardId]=useState("0");

  return(
    <Router>
    <Switch>
      <Route exact path='/' component={SignUp} />
      <Route exact path='/signup' component={SignUp} />
      <Route exect path='/login' render={(props) => <Login setUser={setUser}/> } />
      <Route exect path='/lists' render={(props) => <RouteList boardId={boardId} setBoardId={setBoardId}/> } />
      <Route exact path="/boards" render={(props) => <RouteBoard setBoardId={setBoardId}/> }  />  
    </Switch>
    </Router>
  
 /*  <div>
      <BoardRoute/>
    </div>*/
  
 /* <div>
  <ListContainer>
    <RouteListe/>
  </ListContainer>
  </div>*/
 /* <div><Login/></div>*/
  );
  
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