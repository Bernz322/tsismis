import styled from "styled-components/macro";

const StyledChatInfo = styled.div`
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .top{
            width: 100%;
        }

        .header{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 25px;
            text-align: center;

            .configure{
                position: absolute;
                right: 0;
                margin-right: 15px;
            }
        }

        .info-container{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            overflow-y: auto;

            img{
                height:80px;
                width:80px;
                border-radius: var(--border-radius-circle);
                margin: 0 0 25px;
                background-color: white;
            }

            .head{
                color: ${(props) => props.theme.font};
                text-align: center;
                margin: 15px 0 40px;
                ::first-letter{
                    text-transform: capitalize;
                }
            }

            .name-deet{
                color: var(--minor-font-color);
                margin: 10px 0 25px;
            }

            .sub-head, .about-gc{
                text-align: justify;
                color: ${(props) => props.theme.font};
            }

            .sub-head{
                font-size: var(--fz-lg);
                color: var(--minor-font-color);
            }

            .about-gc{
                margin: 0 0 25px;
                font-size: var(--fz-xs);
                ::first-letter{
                    text-transform: capitalize;
                    font-size: var(--fz-xl);
                }
            }

            h4{
                margin-bottom: 10px;
            }
        }

    .btn-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .btn-leave{
        cursor: pointer;
        margin: 10px 0 0;
        padding: 10px;
        outline: none;
        border: var(--default-error-color) solid 1px;
        width: 100px;
        border-radius: 10px;
        background-color: var(--default-error-color);
        color: #f5f6fb;
        font-size: var(--fz-sm);
        transition: all 0.3s ease-in-out;
        &:hover{
            filter: brightness(1.2);
        }
    }
        
`

export default StyledChatInfo;