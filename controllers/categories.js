import Category from '../models/Category';

export const get = async (request, response) => {
    const categories = await Category.find({ user: request.userId});
    
};

export const getOne = async (request, response) => {
};

export const create = async (request, response) => {
};

export const update = async (request, response) => {
};

export const deleteCategory = async (request, response) => {
};
