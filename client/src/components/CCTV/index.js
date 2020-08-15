import ReactPlayer from 'react-player'
import React from "react";

export default function Index () {
	return (
			<ReactPlayer style={{margin:'auto', minHeight: '300px'}}
			             url="https://www.youtube.com/watch?v=geZXCYNRvy4"
			             width='100%' height='100%' muted playing />
	)
}