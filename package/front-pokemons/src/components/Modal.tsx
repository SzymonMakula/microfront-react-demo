import { gql, useQuery } from '@apollo/client'
//@ts-ignore
import styled from "styled-components"
import Photo from './Photo'
import StatsScreen from './StatsScreen'
//@ts-ignore
import {InvertedButton, Loader} from "@mb/styleguide"


const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  height: 100vh;
  width: 100vw;
  background: rgb(0, 0,0,0.5);

`

const Wrapper = styled.div(({theme: {colors}}) =>`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 45.4rem;
    width: 34rem;
    border: 2px ${colors.masterYellow} solid;
    padding: 2rem;
    background-color: ${colors.backgroundDefault}; 
    color: ${colors.white};
   
`)

const SelectScreen = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
`

const ErrorMessage = styled.p`
  font-size: 2rem;
  margin-top: auto;
`
const StyledButton = styled(InvertedButton)`
  font-size: 1.3rem;
  position: absolute;
  bottom: -2.7rem;
  width: 20rem;
  align-self: center;
  `

const GET_POKEMON_STATS = gql`
  query($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon){
      sprite
      species
      abilities { first second hidden }
		  baseStats { hp attack defense specialattack specialdefense speed }
    }
  }

`;



export default function Modal({selectedPokemon, closeModal}) {
  const { loading, error, data } = useQuery(GET_POKEMON_STATS, {variables: { pokemon: selectedPokemon },
  });


  if (error){
    return(
    <ModalBackground>
        <Wrapper>
          <ErrorMessage>Error occurred: {error.message}</ErrorMessage>
            <StyledButton onClick={closeModal}>Close Card</StyledButton>
        </Wrapper>
      </ModalBackground>)
  }
  

  if (loading){
    return(
      <ModalBackground>
        <Wrapper>
          <Loader/>
        </Wrapper>
      </ModalBackground>)
  }

  return (
    <ModalBackground>
     <Wrapper>
        <Photo sprite={data.getPokemon.sprite} />
        <SelectScreen>
            <StatsScreen pokemonStats={data.getPokemon.baseStats} pokemonAbilities={data?.getPokemon?.abilities}/>
        </SelectScreen>
        <StyledButton onClick={closeModal}>Close Card</StyledButton>
    </Wrapper>   
    </ModalBackground>

  )
}
