import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;