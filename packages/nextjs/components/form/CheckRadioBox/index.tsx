'use client';
import React, {FC, ReactElement, useContext} from 'react';
import {Controller} from 'react-hook-form';
import FormContext from "~~/context/Form.context";
import {ISelectOption} from "~~/models";
import FormErrorMessage from "~~/components/form/FormErrorMessage";


export interface ICheckboxProps {
    label: ReactElement | string;
	options: ISelectOption[];
	name: string;
	type: 'radio' | 'checkbox'
}

const CheckRadioBox: FC<ICheckboxProps> = ({label, name, options, type}) => {
	const {control} = useContext(FormContext);

	return(
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, name }, fieldState: {error} }) => (
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">{label}</label>
					<div className="mt-2 space-y-2">
						{options.map(({value, label}, i) => (
							<label key={`cofounder-option-${i}`} className="inline-flex items-center">
								<input
									type={type}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									value={value}
									className="form-radio"
							   	/>
								<span className="ml-2">{label}</span>
							</label>
					))}
					</div>
					<FormErrorMessage error={error}/>
				</div>
			)}/>
	);
};

export default CheckRadioBox;
