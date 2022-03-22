import styled from 'styled-components/macro'

const StyledNavbar = styled.nav`
    background-color: ${(props) => props.theme.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    max-height: 75px;

    .navbar{
        max-width: var(--site-max-width);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 0 15px;
    }

    svg.right-svg, svg{
        width: 30px;
        height: 30px;
        color: ${(props) => props.theme.svg};
        margin: 0 5px;
        cursor: pointer;
        
    }

    svg.right-svg{
        @media (max-width: 500px) {
            width: 25px;
            height: 25px;
        }
    }

    .left{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        h1{
            font-size: var(--fz-xxl);

            @media (max-width: 500px) {
                display: none;
            }
        }
    }

    .right{
        display: flex;
        align-items: center;
        justify-content: center;

        .user{
            display: flex;
            align-items: center;
            justify-content: center;

            span.username{
                margin-right: 5px;
                text-transform: uppercase;
                font-weight: 900;
            }

            .notif{
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            span.notif{
                position: absolute;
                top: -5px;
                right: 12px;
                background-color: var(--default-notif-color);
                width:15px;
                height:15px;
                text-align: center;
                border-radius: 50%;
                color: white;
                font-size: var(--fz-xxs);
            }
            img{
                width: 40px;
                height: 40px;
                border-radius: var(--border-radius-circle);
                cursor: pointer;
                background-color: white;
            }
        }
    }

    .floating-notif-menu{
        position: absolute;
        right: 60px;
        top: 60px;
        max-width: 125px;
        text-align: left;
        box-shadow: var(--default-box-shadow);
        background-color: ${(props) => props.theme.primary};
        padding: 10px;
        border-radius: 10px;
        z-index: 9999;

        .notif-container{

            hr{
                border-top: 1px solid;
            }

            p{
                font-size: var(--fz-xxs);
                text-align: justify;
                margin-bottom: 5px;
                color: green;
                font-weight: 700;
                cursor: pointer;
                ::first-letter{
                    text-transform: capitalize;
                    display: inline-block;
                }
            }

            span{
                color:${(props) => props.theme.font};
            }
        }

        @media (max-width: 900px) {
            right: 25px;
        }

        @media (max-width: 400px) {
            right: 10px;
        }
    }

    .floating-profile-menu{
        position: absolute;
        right: 15px;
        top: 60px;
        max-width: 125px;
        text-align: left;
        box-shadow: var(--default-box-shadow);
        background-color: ${(props) => props.theme.primary};
        padding: 10px;
        border-radius: 10px;
        z-index: 9999;

        .logout-container{

            &:hover{cursor:pointer}

            hr{
                border-top: 1px solid;
            }

            p{
                font-size: var(--fz-xxs);
                
                margin-bottom: 5px;
            }

            span.notif{
                color: green;
            }
        }

        @media (max-width: 900px) {
            right: 25px;
        }

        @media (max-width: 400px) {
            right: 10px;
        }
    }
`

export default StyledNavbar