import {FC} from 'react';
import {FieldError} from 'react-hook-form';


interface IFormErrorMessageProps {
    error: FieldError | undefined;
}

const errorHandler = (error: FieldError): string | undefined => {
	if (!error?.message) {
		const newError: FieldError = Object.values(error)[0] as unknown as FieldError;
		return newError?.message;
	}
};

const FormErrorMessage: FC<IFormErrorMessageProps> = ({ error }) => {
	return (error && (
		<p className={'font-bold text-red-700'}>
			{errorHandler(error)}
		</p>
	)
	);
};

export default FormErrorMessage;
