//@ts-ignore
import styled, {ThemeProvider} from "styled-components"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Modal from "./components/Modal";
import Options from "./components/Options";
import { useState } from "react";
//@ts-ignore
import { theme } from "@mb/styleguide";

const client = new ApolloClient({
  uri: "https://graphqlpokemon.favware.tech/",
  cache: new InMemoryCache()
});

const Container = styled.div`
  display: flex;
  height: 100%;
`

export default function Root(props) {
  const [pokemon, setPokemon] = useState(null)


  function formatPokemonName(name){
    return name.toLowerCase().replaceAll('-', '')
  }

  function closeModal(){
    setPokemon(null)
  }

  function onSelectedPokemon(e){
    setPokemon(e.target.value)
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Container>
          <Options selectedPokemon={pokemon} onSelectedPokemon={onSelectedPokemon} />
          {pokemon && <Modal selectedPokemon={formatPokemonName(pokemon)} closeModal={closeModal}/>}
        </Container>
      </ThemeProvider>
    </ApolloProvider>);
}
