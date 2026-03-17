import styled from 'styled-components';
import { Device } from '../../styles/breakpoints';
export const ColorcontentTable = styled.div`
    color: ${(props) => props.$color};
    border-radius: 8px;
    border: 1px dashed ${(props) => props.$color};
    text-align: center;
    padding: 3px;
    width: 70%;
    @media ${Device.tablet} {
        width: 100%;
    }
`