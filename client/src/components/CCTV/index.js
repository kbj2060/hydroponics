import React from "react";

export default function CCTV () {
	return (
		<img alt={"cctv"} style={{margin:'auto', minHeight: '300px',   borderRadius: '20px',
			background: '#161717',
			boxShadow:  'inset 6px 6px 12px #0b0b0b,inset -6px -6px 12px #212323',}}
				 src="http://121.157.207.47:9999/?action=stream" width='100%' height='100%' muted autoPlay={true} />
	)
}
