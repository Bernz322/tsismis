import styled from "styled-components/macro";

const StyledChatMain = styled.div`
    height: 100%;

    .no-selected-chat{
        height: 90%;
        max-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: justify;
        margin: 0 auto;

        @media (max-width: 400px) {
            margin: 15px;
        }

        p{
            margin: 15px 0;
        }

        ol{
            width: 100%;
            max-width: 250px;
        }
    }

    svg{
        width: 30px;
        height: 30px;
    }

    h1{
        font-size: var(--fz-xxl);
        padding: 0 15px;
        ::first-letter{
            text-transform: capitalize;
        }
    }

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .left, .right{
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            h4{
                margin-left: 5px;
                @media (max-width: 500px) {
                    display:none;
                }
            }
        }

        .center{
            text-align: center;
            @media (max-width: 600px) {
                font-size: var(--fz-xs);
            }
        }
    }

    .main-chat-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .chat-box-container{
        flex: 11;
        overflow-y: auto;
        height: calc(100% - 100px);
        background-color: ${(props) => props.theme.input};
        border: ${(props) => props.theme.input} solid 1px;
        border-radius: 10px;

        @media (max-height: 740px) {
            height: calc(100% - 120px);
        }

        .scrollable{
            padding: 10px 20px;
            height: 100%;
            width: 100%;
        }
        
        h2.welcome-message{
            text-align: center;
            font-size: var(--fz-xl);
            margin-bottom: 10px;
            color: ${(props) => props.theme.font};
            @media (max-width: 700px) {
                font-size: var(--fz-md);
            }
            .chat-message-content{
                font-size: var(--fz-xs);
                font-weight: 400;
            }
        }
    }

    .chat-input-field{
        width: calc(100% - 40px);
        flex: 1;
        position: absolute;
        bottom: 0;
        margin: 0 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: ${(props) => props.theme.input} solid 1px;
        border-radius: 10px;
            input{
                padding: 10px;
                outline: none;
                border: none;
                width: 100%;
                border-radius: 10px;
                background-color: ${(props) => props.theme.input};
                color: ${(props) => props.theme.color};
            }
            button{
                background-color: Transparent;
                border: none;
            }
            svg{
                transform: rotate(90deg);
                &:hover{filter: brightness(1.2);}
            }
    }
`
export default StyledChatMain