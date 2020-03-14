import mongoose from 'mongoose';

const { Schema } = mongoose;

const hobbySchema = new Schema(
  {
    name: { type: String, required: true },
    passionLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Very-High'],
      required: true
    },
    year: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model('Hobby', hobbySchema);
