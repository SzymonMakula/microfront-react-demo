//@ts-ignore
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  width: auto;`


const Row = styled.div`
  display: flex;
  width: 100%;
  `

const Title = styled.h2`
  font-size: 1.6rem;
  align-self: flex-start;
  margin-top: 2rem;
  `



const StatValue = styled.p(({theme: {colors}}) =>`
  font-size: 1.2rem;
  margin: 0;
  color: ${colors.white};
`)
const StatDescription = styled(StatValue)`
  font-weight: 600;
  margin-right: 0.2rem;
  color: orange;
`


export default function StatsScreen({pokemonStats, pokemonAbilities}) {

const STATS_ARRAY = [
  {stat1Name: 'health', stat1Value: pokemonStats.hp, stat2Name: 'speed', stat2Value: pokemonStats.speed},
  {stat1Name: 'attack', stat1Value: pokemonStats.attack, stat2Name: 'special attack', stat2Value: pokemonStats.specialAttack || 'N/A'},
  {stat1Name: 'defense', stat1Value: pokemonStats.defense, stat2Name: 'special defense', stat2Value: pokemonStats.specialDefense || 'N/A'}
]

const ABILITIES_ARRAY = [
  {abilityName: "first", abilityValue: pokemonAbilities.first },
  {abilityName: "second", abilityValue: pokemonAbilities.second },
  {abilityName: "hidden", abilityValue: pokemonAbilities.hidden || 'N/A' }
]

  return (
    <Wrapper>
      <Title>STATS: </Title>
      {STATS_ARRAY.map(({stat1Name, stat1Value, stat2Name, stat2Value}, index) => 
        <Row key={index}>
          <Row>
            <StatDescription>{stat1Name}: </StatDescription>
            <StatValue>{stat1Value}</StatValue>
          </Row>
          <Row>
            <StatDescription>{stat2Name}: </StatDescription>
            <StatValue>{stat2Value}</StatValue>
          </Row>
        </Row>
      )}
      <Title>Abilities: </Title>
      {ABILITIES_ARRAY.map(({abilityName, abilityValue}, index) => 
      <Row key={index}>
        <StatDescription>{abilityName}: </StatDescription>
        <StatValue>{abilityValue}</StatValue>
      </Row>)}
    </Wrapper>
  )
}
