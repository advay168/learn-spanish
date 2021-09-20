import styled from "styled-components";

export const Container = styled.div``;

export const Heading =styled.h3`
    font-size:2rem;
    text-align: center;
    color: #924848;
`;

export const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-items: center;
    margin: 5px 20px;
`;

export const Option = styled.button`
    /* background:green; */
    width:100%;
    max-width:500px;
    height: 90px;
    font-size: 20px;
`;