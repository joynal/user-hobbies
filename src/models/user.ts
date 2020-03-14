import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.virtual('hobbies', {
  ref: 'Hobby',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});

export default mongoose.model('User', userSchema);
