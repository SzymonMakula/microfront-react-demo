//@ts-ignore
import styled from "styled-components"

const DogImage = styled.img`
    width: 50%;
    height: 200px;
`
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

type PokemonPhotoProps = {
    sprite: string
}

export default function PokemonPhoto({sprite}: PokemonPhotoProps) {

  return (
      <ImageContainer>
          <DogImage src={sprite} />
      </ImageContainer>
  )
}
