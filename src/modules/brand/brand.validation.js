import Joi from 'joi';

export const createBrandSchema = Joi.object({

    name: Joi.string().required().min(3).max(30),
});



export const updateBrandSchema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        id: Joi.string().required().hex().length(24),

    });

    export const DeleteBrandSchema = Joi.object({
        id: Joi.string().required().hex().length(24),
        
    });