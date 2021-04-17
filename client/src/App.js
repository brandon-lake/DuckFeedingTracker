import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import AddFeeding from './components/AddFeeding';
import ViewFeedings from './components/ViewFeedings';
import PageNotFound from './components/PageNotFound';
import { useState } from "react";

function App() {
	const currentPage = useState("view");

    return (
        <div className="App">
			<Router>
				<Header currentPage={currentPage} />
				<Switch>
					<Route path="/" exact>
						<Redirect to="/view" />
					</Route>
					<Route path="/view" component={ViewFeedings} />
					<Route path="/add" component={AddFeeding} />
					<Route component={PageNotFound} />
				</Switch>
			</Router>
        </div>
    );
}

export default App;
