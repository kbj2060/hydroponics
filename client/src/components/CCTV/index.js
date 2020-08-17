import ReactPlayer from 'react-player'
import React from "react";

export default function CCTV () {
	return (
			<img style={{margin:'auto', minHeight: '300px'}}
			             src="http://192.168.0.11:8081/"
			             width='100%' height='100%' muted autoPlay={true} />
	)
}