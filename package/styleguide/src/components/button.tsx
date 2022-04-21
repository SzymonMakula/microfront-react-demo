import React from 'react'
import styled from "styled-components"

const StyledButton = styled.button`
    background-color: rgb(247, 202, 24);
    color: black;
    padding: 1.5rem 0;
    transition: 0.4s ease;
    font-weight: 600;
    border-radius: 3rem;
    border: 1px rgb(247, 202, 24) solid;


    :hover{
        color: rgb(247, 202, 24);
        background-color: black;
    }

`

export default function Button(props) {
    const {children, className = "", disabled = false, ...rest} = props
  return (
    <StyledButton className={className} disabled={disabled} {...rest}>{children}</StyledButton>
  )
}
