import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Lumeni } from "./components/Lumeni"


ReactDOM.render(
  <React.StrictMode>
   <Router>
    <Lumeni />
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
