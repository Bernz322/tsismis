import styled from "styled-components/macro"

const StyledMainPage = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;

    .main{
        width: var(--site-max-width);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
        @media (max-width: 900px) {
            flex-direction: column;
        }
    }

    .header{
        background-color: ${(props) => props.theme.body};
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .button-auth-changer{
            flex: 6;
            padding: 10px;
            font-weight: 700;
            cursor: pointer;
            background-color: ${(props) => props.theme.primary};
            border: 1px solid ${(props) => props.theme.svg};

            &:hover{
                background-color: ${(props) => props.theme.input};
            }
        }

        .selected{
             background-color: ${(props) => props.theme.input};
        }

        .login{
            border-radius: 10px 0 0  10px;
        }
        .register{
            border-radius:0 10px 10px 0;
        }
    }
    
    .left{
        display: flex;
        flex:6;
        height:100%;
        width: 100%;
        padding: 25px;

        .container{
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-right: 90px;
            width: 100%;
        
            @media (max-width: 1270px) {
                margin-right: 50px;
            }

            @media (max-width: 950px) {
                margin-right: 10px;
            }

            @media (max-width: 900px) {
                margin-right: 0px;
            }

            h1{
                font-size: clamp(3.5rem, 10vw, 5rem);
                margin: 50px 0 25px;
            }

            p{
                font-size: var(--fz-lg);

                @media (max-width: 670px) {
                    font-size: var(--fz-md);
                }
            }

            .main-svg{
                height: 250px;
                width: 250px;
            }
        } 
    }

    .right{
        display: flex;
        flex: 6;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
        padding: 25px;
        width:100%;
    }

    .main-right{
        background-color: ${(props) => props.theme.primary};
        border-radius: 10px;
        width: 100%;
        height: fit-content;
        padding: 25px;
    }
`

export default StyledMainPage