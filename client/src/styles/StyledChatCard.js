import styled from "styled-components/macro"

const StyledChatCard = styled.div`
    height: 60px;
    margin-top: 10px;

    .card{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-radius: 10px;
        padding: 5px 5px 5px 10px;

        &:hover{
            background-color: ${(props) => props.theme.input};
        }

        .card-left{
            display: flex;

            img{
                height:45px;
                width:45px;
                border-radius: 10px;
                margin-right: 10px;
                background-color: white;
            }

            .chat-deets{
                display: flex;
                justify-content: center;
                align-items: left;
                flex-direction: column;
                margin: 0 10px 0 0;
                font-weight: 700;

                .chat-title{
                    ::first-letter{
                        text-transform: capitalize;
                    }
                }

                .recent-chat{
                    color: var(--minor-font-color);
                    font-size: var(--fz-xs);
                    margin-top: 5px;
                    font-weight: 700;
                    ::first-letter{
                        text-transform: capitalize;
                    }
                    span.message{
                        font-weight: 400;
                    }
                }
            }
        }

        .timespan{
            color: var(--icon-font-color);
            font-size: var(--fz-xxs);
            margin: auto 0 0
        }
        
    }

    .selected{
        background-color: ${(props) => props.theme.input};
    }
`

export default StyledChatCard