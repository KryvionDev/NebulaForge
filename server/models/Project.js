const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  name: { type:String, default:'Untitled Scene' },
  sceneJSON: { type:Object, default:{} },
  updatedAt: { type:Date, default:Date.now }
});
module.exports = mongoose.model('Project', ProjectSchema);
