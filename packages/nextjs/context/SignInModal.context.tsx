'use client';

import { createContext } from 'react';

export interface ISignInModalContextProps {
	setIsVisible: (val: boolean) => void;
	isVisible: boolean;
}

const SignInModalContext = createContext<ISignInModalContextProps>({
	isVisible: null,
	setIsVisible: null,
});

export default SignInModalContext;
