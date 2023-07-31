import { styled } from "styled-components";

export const UserForm = styled.form`
    box-sizing:border-box;

    width:340px;
    height:400px;

    padding-left:20px;
    padding-right:20px;

    background-color: #f1f1f1;
    border:1px solid #cdcdcd;
    border-radius:20px;

    margin:auto;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;

    input {
        border: 2px solid lightgrey;
        border-radius:5px;
        width:290px;
        height:30px;
        margin-bottom:40px;
    }

    span{
        font-size:14px;
        font-weight:700;
        color:red;
        margin-left:10px;
        margin-bottom:20px;
    }

    button{
        width:290px;
        height:40px;
        border:none;
        background-color:lightblue;

        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        cursor:pointer;

        font-weight:bolder;
        font-size:16px;
    }
`;