import { useEffect, useState } from "react";
//@ts-ignore
import styled from "styled-components"
import axios from "axios";


const Container = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4rem;
  height: 100vh;

`

const Quote = styled.h2`
    font-size: 4rem;
    font-style: italic;
    text-align: center;
    color: white;
`

export default function Root(props) {
  const [quote, setQuote] = useState('');

  useEffect(() => {

      axios.get(`https://icanhazdadjoke.com/`, {headers: {
        Accept: "application/json"
      }}).then(res => {
        const {data} = res;
        setQuote(data.joke)
      })

  }, [])
  return <Container>
    <Quote>
      {quote}
    </Quote>
  </Container>;
}
