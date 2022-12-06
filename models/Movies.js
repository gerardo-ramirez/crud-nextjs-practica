import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "por favor ingrese titulo"],
  },
  plot: {
    type: String,
    require: [true, "esto es un plot"],
  },
});
export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);