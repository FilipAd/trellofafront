import logo from './logo.svg';
import './App.css';
import List from "./components/List/List";
import styled from "styled-components";

const ListContainer=styled.div
`
display:flex;
flex-direction:row;
`;
export default function App() 
{
  const lists=
  [
          {
            id:"list-1",
            title:"prva lista",
            cards:[{
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
            title:"druga lista",
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
            title:"treca lista",
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
  return (
   <div>
    <ListContainer>
   {lists.map((list, i) =><List list={list} key={list.id} />)}
   </ListContainer>
   </div>
  );
}
