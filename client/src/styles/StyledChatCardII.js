import styled from "styled-components/macro"

const StyledChatCardII = styled.div`
    width: 100%;
    margin: 10px auto 0;
    .card{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-radius: 10px;
        padding: 5px 10px;
        color: var(--minor-font-color);

        &:hover{
            background-color: ${(props) => props.theme.input};
        }

        .card-left{
            display: flex;

            img{
                height:45px;
                width:45px;
                border-radius: 10px;
                margin: 0;
                background-color: white;
            }

            .chat-title{
                display: flex;
                justify-content: center;
                align-items: left;
                flex-direction: column;
                margin: 0 10px;
                color: ${(props) => props.theme.font};
                font-weight: 700;
            }
        }
        svg{
            width: 35px;
            height: 35px;
        }
    }
`

export default StyledChatCardII