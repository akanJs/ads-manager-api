import mongoose from 'mongoose';

const adContentSchema = new mongoose.Schema({
  isImage: {
    type: Boolean
  },
  isVideo: {
    type: Boolean
  },
  imagePath: {
    type: [String]
  },
  videoPath: {
    type: [String]
  }
});

const AdContent = mongoose.model('AdContent', adContentSchema);

export { adContentSchema, AdContent };

