import styled from "styled-components/macro"

const StyledGroupChatModal = styled.div`
    position: fixed;
    width: 500px;
    height: fit-content;
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    padding: 15px 25px;
    overflow-y: auto;

    @media (max-width: 510px) {
        width: 300px;
        height: 350px;
        h1{
            font-size: var(--fz-xl);
        }
        h4{font-size: var(--fz-sm);}
    }

    .p-head{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;

        h4{
            margin: 0 5px 0 0;
        }
    }

    svg{
        height: 20px;
        width: 20px;
        &:hover{cursor:pointer}
    }

    input, textarea{
        padding: 10px;
        outline: none;
        border: none;
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.theme.input};
        color: ${(props) => props.theme.color};
        margin: 15px 0 0;
    }

    textarea{
        resize: none;
        /* margin-bottom: 10px; */
    }

    h4{
        margin: 15px 0 10px;
    }

    .chip{
        margin: 5px 4px 5px;
    }

    .btn-submit{
        cursor: pointer;
        margin: 10px 0 0;
        padding: 10px;
        outline: none;
        border: ${(props) => props.theme.body} solid 1px;
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.theme.svg};
        color: #f5f6fb;
        font-size: var(--fz-sm);
        transition: all 0.3s ease-in-out;
        &:hover{
            background-color: #f5f6fb;
            color:  ${(props) => props.theme.svg};
            border: ${(props) => props.theme.font} solid 1px;
        }
    }
`

export default StyledGroupChatModal