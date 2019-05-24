import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        default: null
    },
    shared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Category = mongoose.model('Category', categorySchema);

export default Category;