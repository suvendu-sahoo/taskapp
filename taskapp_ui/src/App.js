import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './Pages/Login';
import Register from './Pages/Register';
import Task from './Pages/Task';

import PrivateRoute from './Hocs/PrivateRoute';
import PublicRoute from './Hocs/PublicRoute';

function App() {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route exact path='/' element={<Login />}/>
			</Route>
			<Route element={<PublicRoute />}>
				<Route exact path='/register' element={<Register />}/>
			</Route>
			<Route element={<PrivateRoute />}>
				<Route exact path='/task' element={<Task />}/>
			</Route>
	  	</Routes>
	);
}

export default App;