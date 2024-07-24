import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
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
    element: <RobotPage/>
  },
  {
    path: "/heart",
    element: <HeartPage/>
  }
]);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </Provider>
  );
}

export default App;

