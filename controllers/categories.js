import Category from '../models/Category';

export const getAccountCategories = async (request, response) => {
    const categories = await Category.find({ $or: [{ owner: request.user._id }, { shared: request.user._id }] });
    response.send(categories);
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
    const condition = {
        title: request.title
    };
    if (request.body.addUser) {
        condition['$push'] = request.body.addUser;
    } else if (request.body.removeUser) {
        condition['$pull'] = request.body.removeUser;
    }
    const category = await Category.findByIdAndUpdate(request.params.id, 
            condition, { new: true });
    
    if (!category) {
        return response.status(404).send({ error: 'Category was not found'});
    }

    response.send(501);
};

export const deleteCategory = async (request, response) => {
    const category = await Category.findOneAndDelete({ _id: request.params.id, owner: request.userId });
    if (!category) {
        return response.status(404).send({ error: 'Category was not found' });
    }
    response.send({ message: 'Category was removed' });
};
