import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
	return (
			<nav className="navbar">
				<h1 id="logo">Demozon</h1>
				<Link
						to="/items"
				>
					Home
				</Link>
			</nav>
	);
};

export { Navbar } ;
