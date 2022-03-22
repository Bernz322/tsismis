import styled from "styled-components/macro"

const StyledAuth = styled.div`

    .auth-inputs, textarea{
        padding: 10px;
        outline: none;
        border: none;
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.theme.input};
        color: ${(props) => props.theme.color};
        margin: 5px 0;
    }

    .show-password{
        display: flex;
        align-items: center;
        margin: 5px 0;
        label{
            margin-left: 10px
        }
    }

    .img-upload{
        display: flex;
        align-items: center;
        margin: 5px 0;
        p{
            margin-left: 10px
        }
    }

    textarea{
        resize: none;
    }

    button{
        cursor: pointer;
        margin: 10px 0 0;
        padding: 10px;
        outline: none;
        border: ${(props) => props.theme.body} solid 1px;
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.theme.svg};
        color: #f5f6fb;
        font-size: var(--fz-md);
        transition: all 0.3s ease-in-out;
        &:hover{
            background-color: #f5f6fb;
            color:  ${(props) => props.theme.svg};
            border: ${(props) => props.theme.font} solid 1px;
        }

        @media (max-width: 900px) {
            font-size: var(--fz-sm);
        }
    }

    .upload-img{
        margin-top: 15px;
    }

    input[type="file"] {
        display: none;
    }

    svg{
        width: 35px;
        height: 35px;
        cursor: pointer;
    }

    .error-msg{
        color: var(--default-error-color);
    }
`

export default StyledAuth