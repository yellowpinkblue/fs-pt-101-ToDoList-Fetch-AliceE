import React from "react";
import { TodoFetch } from "./todofetch";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
            
			<TodoFetch />

			
		</div>
	);
};

export default Home;