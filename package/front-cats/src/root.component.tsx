//@ts-ignore
import {Loader, Button, InvertedButton} from "@mb/styleguide"
import axios from "axios";
import { useState } from "react";

export default function Root(props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  async function fetchACat(){
    setLoading(true)
    const { data } = await axios.get(`https://cataas.com/cat/says/Im just yet another microfront?json=true`)
    setLoading(false)
    const catImage = `https://cataas.com/${data.url}`
    setImage(catImage)
  }

  function clear(){
    setImage(false)
  }
  

  return  (
    <div className="container h-full w-screen flex flex-col items-center justify-start">
      <div className="flex flex-row my-16">
        <Button onClick={fetchACat} className="w-80 text-2xl my-16 mx-4" >Fetch a cat</Button>
        <InvertedButton onClick={clear} className="w-80 text-2xl my-16" >Clear</InvertedButton>

      </div>
      {loading && <Loader></Loader>}
      {image && !loading && <img src={image}/>}
    </div>
  );
}
