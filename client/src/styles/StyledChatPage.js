import styled from 'styled-components/macro'

const StyledChatPage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--site-max-width);
    width: 100%;
    height: calc(100vh - 45px);
    margin: 0 auto;
    padding: 20px 0 60px;
    overflow-y: auto;

    .container_left, .container_right{
        flex: 3;
        height: 100%;
        background-color: ${(props) => props.theme.primary};
        border-radius: 10px;
        padding: 10px 20px;
        overflow-y: auto;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        position: relative;
    }

    .container_middle{
        flex:6;
        height: 100%;
        margin: 0 15px;
        background-color: ${(props) => props.theme.primary};
        border-radius: 10px;
        padding: 10px 20px;
        position: relative;
        @media (min-width: 1200px) {
            margin: 0;
        }
    }
    

    .container_left{
        margin: 0 15px;
        @media (max-width: 1250px) {
            
        }
    }

    .container_right{
        margin: 0 15px;
        @media (max-width: 1200px) {
            /* flex:12; */
        }
    }

    svg{
        width: 20px;
        height: 20px;
        color: ${(props) => props.theme.svg};
        margin: 0 5px;
        cursor: pointer;
    }

    .hide{
        display: none;
    }

    .uhide{
        display: block;
    }
`

export default StyledChatPage