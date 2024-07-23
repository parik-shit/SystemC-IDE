import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SmileyPage from "./routes/smiley/SmileyPage.jsx";
import HeartPage from "./routes/heart/HeartPage.jsx";
import SkullPage from "./routes/skull/SkullPage.jsx";
import RobotPage from "./routes/robot/RobotPage.jsx";


import BadBot from './components/badbot'; // Ensure the filename matches


const router = createBrowserRouter([
	{
		path: "/",
		element: <BadBot/>
	},

	{
		path: "/smiley",
		element: <SmileyPage/>
	},
	
	{
		path: "/skull",
		element: <SkullPage/>
	},
	
	{
		path: "/robot",
		elemet: <RobotPage/>
	},
	{
		path: "/heart",
		element: <HeartPage/>
	}
]);

function App() {
  return (
      <div className="App">
	  <RouterProvider router={router}/>
      </div>
  );
}

export default App;

