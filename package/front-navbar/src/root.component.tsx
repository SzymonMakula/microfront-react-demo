import styled from 'styled-components'
//@ts-ignore
import { Link } from "@reach/router";
import reactLogo from "../public/react-logo.svg"
//@ts-ignore
import { theme } from "@mb/styleguide"
//@ts-ignore
import { ThemeProvider } from "styled-components"

const NavContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  font-family: monospace;
  width: 100%;
  height: 88px;
  padding: 4px;
  background-color: rgb(26, 26, 26);
  box-shadow: rgba(252, 252, 252, 0.4) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 2px 10px 0px;
  `

const Logo = styled.img`
  height: 60px;`

const Text = styled.p`
    margin-left: 2rem;
    color: #61dafb;
    font-size: 2rem;
`

const LinksList = styled.ul`
  margin-left: 14rem;
`

const StyledLink = styled(Link)(({theme: {colors}} )=>`
  text-decoration: none;
  font-size: 2rem;
  color: ${colors.white};
  transition: 0.3s ease;
  margin-left: 4rem;

  :hover{
    color: ${colors.masterYellow};
  }

`)


export default function Root(props) {
  
  return (
    <ThemeProvider theme={theme}>
      <NavContainer>
        <Logo src={reactLogo}/>
        <Text>React Microfrontends</Text>
        <LinksList>
        <StyledLink to="/">Pokemons&Cats</StyledLink>
        <StyledLink to="/dad_jokes">Dad-jokes</StyledLink>
        </LinksList>
      </NavContainer>
  </ThemeProvider>

  )
}
