import Joi from 'joi';

export interface IContactFormData {
    name: string;
    email: string;
    message: string;
    company: string;
    position: string;
    terms: boolean;
    token: string;
}

export const CONTACT_FORM_VALIDATOR = {
	name: Joi.string().min(3).required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de', 'nl', 'fr'] } }).required(),
	message: Joi.string().min(50).required(),
	company: Joi.string().allow('').min(3).optional(),
	position: Joi.string().allow('').min(3).optional(),
	terms: Joi.boolean().valid(true).required(),
};

export const CONTACT_FORM_DEFAULT_VALUE = {
	name: '',
	email: '',
	message: '',
	company: '',
	position: '',
	terms: false,
};
