import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// internal imports
import GenerateBusiness from './components/generate-business';
import FirstSection from './components/generate-business/firstSection.component';
import SecondSection from './components/generate-business/secondSection.component';
import Review from './components/generate-business/review.component';
// styles
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact  path="/" component={GenerateBusiness} />
        <Route exact path="/firstSection" component={FirstSection} />
        <Route exact path="/secondSection" component={SecondSection} />
        <Route exact path="/review" component={Review} />
      </Switch>
  </Router>
  );
}

export default App;
