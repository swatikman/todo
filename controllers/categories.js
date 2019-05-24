import Category from '../models/Category';
import User from '../models/User';

export const getAccountCategories = async (request, response) => {
    const user = await User.findById(request.userId)
            .populate('categories.category');
    response.send(user.categories);
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
    const user = await User.findById(request.userId);
    user.categories.push({ category: category._id, owner: true });
    await user.save();
    
    response.send(category);
};

export const update = async (request, response) => {
};

export const deleteCategory = async (request, response) => {
    const category = await Category.findOneAndDelete({ _id: request.params.id, owner: request.userId });
    if (!category) {
        return response.status(404).send({ error: 'Category was not found' });
    }
    const user = await User.findById(request.userId);
    user.categories = user.categories.filter(({ category }) => category.toString() !== request.params.id);
    await user.save();
    
    response.send({ message: 'Category was removed' });
};
