import styled from "styled-components/macro"

const StyledChatContainer = styled.div`
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;

            h2{
                flex: 8;
                @media (max-width: 430px) {
                    display: none;
                }
            }

            svg{
                margin-right: 15px;
            }

            .search-add{
                display: flex;
                flex: 4;
                justify-content: flex-end;
                align-items: center;
                width: 100%;
                svg{
                    margin:0
                }
                .search-field{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    border-radius: 10px;
                    margin: 0 5px 0 15px;
                    input{
                        padding: 10px 0 0;
                        border: 0;
                        outline: 0;
                        background-color: transparent;
                        color: ${(props) => props.theme.color};
                        width: 150px;
                        &:focus{
                            border-bottom: 1px solid ${(props) => props.theme.color};
                        }
                    }
                }
            }
        }

        .no-chats{
            text-align: center;
            p{
                text-align: justify;
                margin: 10px 0;
                padding: 0 25px;
            }

            hr{
                margin: 0 25px;
            }
        }
`

export default StyledChatContainer