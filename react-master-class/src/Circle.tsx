// styled-components import
import styled from 'styled-components';

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius : 100px;
    background-color : ${props => props.bgColor};
    border : 1px solid ${props => props.borderColor};  
`;

// Circle에서 보낸 bgColor를 Container에서 정의 하기 위한 interface
interface ContainerProps {
    bgColor:string,
    borderColor:string
}

// bgColor를 정의하기 위한 Interface
interface CircleProps {
    bgColor:string,
    borderColor?:string
    text?:string
}

function Circle({borderColor, bgColor, text = "test data"}:CircleProps) {
    return (
        <Container borderColor={borderColor ?? bgColor} bgColor={bgColor}>{text}</Container>
    )
}

export default Circle;