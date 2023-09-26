import joi from 'joi';

export const createCategorySchema = joi.object({
    name: joi.string().required().min(3).max(30),

})

export const getOneCategorySchema = joi.object({
    id: joi.string().required().hex().length(24),
})
