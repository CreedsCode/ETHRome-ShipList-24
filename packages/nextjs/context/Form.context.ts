'use client';

import { createContext } from 'react';

const FormContext = createContext<{
    control: any;
    errors: any;
	watch?: any;
	setValue?: (name: any, value: any) => void;
		}>({
			control: undefined,
			errors: undefined,
			watch: undefined,
			setValue: undefined,
		});

export default FormContext;
