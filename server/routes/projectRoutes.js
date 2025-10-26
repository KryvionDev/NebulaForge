const express = require('express');
const Project = require('../models/Project');
const auth = require('../utils/authMiddleware');

const router = express.Router();

router.post('/save', auth, async (req,res)=>{
  const { name, sceneJSON } = req.body;
  try {
    const project = await Project.findOneAndUpdate(
      { owner:req.userId, name },
      { owner:req.userId, name, sceneJSON, updatedAt:new Date() },
      { upsert:true, new:true }
    );
    res.json({ project });
  } catch(err) { res.status(400).json({ error:err.message }); }
});

router.get('/', auth, async (req,res)=>{
  const projects = await Project.find({ owner:req.userId });
  res.json({ projects });
});

router.get('/:id/export', auth, async (req,res)=>{
  const project = await Project.findById(req.params.id);
  if(!project) return res.status(404).json({ error:'Not found' });
  res.setHeader('Content-Disposition',`attachment; filename="${project.name}.json"`);
  res.json(project.sceneJSON);
});

module.exports = router;
