import {Project} from "../models/project.model.js"
export const addProject = async(req,res)=>{
    try{
      const {name,
        category,
        video,
        images,
        technology,
        prerequisites,
        positions,
        } = req.body;
      if(!name ||
        !category ||
        !video ||
        !images ||
        !technology ||
        !prerequisites ||
        !positions 
        )
      {
        return res.status(400).json({
            message:"Sorry project cannot be added"
        });
      }
      else{
        const newProject = await Project.create({
            name,
            category,
            video,
            images,
            technology,
            prerequisites,
            positions,
            
        });
        newProject.save();
        return res.status(200).json({
            message:"Project added successfully",
            success:true
        })
      }
    }
    catch(error)
    {
     console.log(error);
    }
}