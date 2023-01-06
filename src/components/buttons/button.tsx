import { StyledButton } from "./styledComponents"



interface IButtonProps{
    type?: "button" | "submit" | undefined
    text: string | React.ReactNode,
    disabled: boolean,
    onClick?: () => void
    buttonSize: "default" | "big" | "medium" | "small"
    buttonStyle: 'bg-ColorBlue' | 'bg-ColorBlue2' | 'bg-ColorBlue3' | 'bg-ColorBlueSmall' | 'bg-ColorRed'
}

export const Button= ({disabled, text, onClick, buttonSize, buttonStyle, type} : IButtonProps)=>{
    return(
        <StyledButton disabled={disabled} buttonSize={buttonSize} buttonStyle={buttonStyle} type={type} onClick={onClick}>{text}</StyledButton>
    )
}