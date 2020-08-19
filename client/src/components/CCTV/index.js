import React from "react";

export default function CCTV () {
	return (
		<img style={{margin:'auto', minHeight: '300px', borderRadius: '0.5rem',}}
				 src="http://192.168.0.11:8091/?action=stream"
		     width='100%' height='100%' muted autoPlay={true} />
	)
}