import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
