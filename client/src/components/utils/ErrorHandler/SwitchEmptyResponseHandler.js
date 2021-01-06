import axios from "axios";

export default async function SwitchEmptyResponseHandler (username, section) {
  await axios.post("/api/post/switch/reset", {
      params: {
        section : section,
        name : username
      }
    }
  ).then(() => {
    console.log("SwitchEmptyResponseHandler")
  })
}