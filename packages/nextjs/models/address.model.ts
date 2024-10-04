import Joi from 'joi';

export const ADDRESS_SCHEMA = {
	city: Joi.string().required(),
	zip: Joi.string().length(5).required(),
	street: Joi.string().required(),
	houseNumber: Joi.string().required(),
};

export interface IAddress {
    street: string;
    houseNumber: string;
    city: string;
    zip: string;
}
