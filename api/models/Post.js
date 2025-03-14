const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  likes: {type: Number, default: 0},
  views: { type: Number, default: 0 },
  //likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  //dislikes: {type: Number, default: 0},
  author:{type:Schema.Types.ObjectId, ref:'User'},
},
 {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;