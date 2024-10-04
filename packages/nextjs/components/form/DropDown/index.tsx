'use client';
import React, {FC, ReactElement, useContext} from 'react';
import {Controller} from 'react-hook-form';
import FormErrorMessage from '../FormErrorMessage';
import {ISelectOption} from "~~/models";
import FormContext from "~~/context/Form.context";


export interface IDropdownProps {
	name: string;
	label?: ReactElement;
	options: ISelectOption[];
}

const DropDown: FC<IDropdownProps> = ({
	label,
	options,
	name,
}) => {
	const {control} = useContext(FormContext);

	return(
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value, name }, fieldState: {error} }) => (
				<>
					<div className="mb-4">
						<label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
						<select id={name}
								name={name}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							{options.map((stageOption, i) => (
								<option key={`stageOption-${i}`} value={stageOption.value}>{stageOption.label}</option>
							))}
						</select>
					</div>
					<FormErrorMessage error={error}/>
				</>
			)}/>
	);
};

export default DropDown;
