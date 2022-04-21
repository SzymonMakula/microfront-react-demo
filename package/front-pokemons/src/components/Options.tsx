import { gql, useQuery } from '@apollo/client'
//@ts-ignore
import styled from "styled-components"


const ScreenOptions = styled.div`
    display: flex;
    left: 0;
    flex-direction: column;
    min-width: 10rem;
    margin-right: 5rem;
`

const OptionTitle = styled.h3(({theme: { colors }}) => `
  margin: 1rem 0;
  padding: 0.2rem;
  font-size: 1.8rem;
  text-align: center;
  color: ${colors.white};
  `);

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  `

const PokemonButton = styled.button(({$isSelected, theme: {colors}}) =>`
    width: 100%;
    min-height: 4rem;
    color:  ${$isSelected ? colors.white : colors.lightCyan};
    font-weight: 500;
    font-size: 1.6rem;
    background-color: inherit;
    border: none;

    &:hover { 
      color: ${colors.white};
    }
`)

const GET_POKEMONS = gql`
  {
    getAllPokemonSpecies
  }
`;



export default function Options({onSelectedPokemon, selectedPokemon}) {
const { loading, error, data } = useQuery(GET_POKEMONS);

if (loading) return <p>"Loading..."</p>;
if (error) return <p>`Error! ${error.message}`</p>;

const sortedPokemons = data.getAllPokemonSpecies.sort()

  return (
    <ScreenOptions>
        <OptionTitle>Pokemon Types</OptionTitle>
        <Column>
            {sortedPokemons.map((pokemon, index) => (
                <PokemonButton onClick={onSelectedPokemon} key={index} value={pokemon} $isSelected={pokemon == selectedPokemon}>
                {pokemon}
                </PokemonButton>
            ))}
        </Column>
    </ScreenOptions>
  )
}
