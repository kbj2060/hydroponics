import React from "react";
import Popup from "reactjs-popup";


const contentStyle = {
	maxWidth: "300px",
	width: "50%"
};

const Menu = () => (
	<Popup
		trigger={<button className="button"> Open Modal </button>}
		modal
		contentStyle={contentStyle}
	></Popup>
);

export default Menu;
