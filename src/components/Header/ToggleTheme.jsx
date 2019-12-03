import React, { useContext } from 'react'
import styled from 'styled-components';
import StateStoreContext from '../../stores/StateStore';
import { ReactComponent as MoonIcon } from './themeicons/moon.svg';
import { ReactComponent as SunIcon } from './themeicons/sun.svg';
import { observer } from 'mobx-react-lite';

export const ToggleTheme = observer(() => {
    const stateStore = useContext(StateStoreContext);
    const isLight = stateStore.currentTheme === 'light';
console.log(`isLight: ${isLight}`);
    const togglingTheme = () => {
console.log(`Before: ${stateStore.currentTheme}`);
        stateStore.currentTheme === 'light' ? 
        stateStore.currentTheme = "dark" : stateStore.currentTheme = "light";
console.log(`After: ${stateStore.currentTheme}`);
    };
    return (
        <ToggleContainer lightTheme={isLight} onClick={togglingTheme}>
            <SunIcon/>
            <MoonIcon/>
        </ToggleContainer>
    );
});

const ToggleContainer = styled.button`
    background: ${({ theme }) => theme.gradient};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 30px;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.7rem;
    justify-content: space-between;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem;
    position: relative;
    width: 3rem;
    height: 2rem;
    top: 0.77vh;

    svg {
        height: auto;
        width: 2.5rem;
        transition: all 0.3s linear;
        &:first-child {
            transform: ${({ lightTheme }) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
        }
        &:nth-child(2) {
            transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
        }
    }
`;