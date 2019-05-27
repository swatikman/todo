import Category from '../models/Category';

export const getAccountCategories = async (request, response) => {
    response.send(501);
};

export const getOne = async (request, response) => {
    const category = await Category.findById(request.params.id);
    if (!category) {
        return response.status(404).send({ error: 'Category was not found' });
    }
    response.send(category);
};

export const create = async (request, response) => {
    const data = {
        owner: request.userId,
        title: request.body.title,
    };
    const category = await Category.create(data);
    
    response.send(category);
};

export const update = async (request, response) => {
    response.send(501);
};

export const deleteCategory = async (request, response) => {
    const category = await Category.findOneAndDelete({ _id: request.params.id, owner: request.userId });
    if (!category) {
        return response.status(404).send({ error: 'Category was not found' });
    }
    response.send({ message: 'Category was removed' });
};
