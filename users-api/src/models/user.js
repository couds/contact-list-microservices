//TODO: Generate model using the swagger.yaml definitions
import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;

const User =  mongoose.model('User', {
  gender: String,
  name: Schema.Types.Mixed,
  location: Schema.Types.Mixed,
  email: String,
  username: String,
  password: String,
  salt: { type: String, select: false },
  md5: { type: String, select: false },
  sha1: { type: String, select: false },
  sha256: { type: String, select: false },
  registered: Number,
  dob: Number,
  phone: String,
  cell: String,
  PPS: String,
  picture: Schema.Types.Mixed
});

export default User;

export const IGNORED_FIELD = {
  password: 0,
  salt: 0,
  md5: 0,
  sha1: 0,
  sha256: 0,
  __v: 0,
}