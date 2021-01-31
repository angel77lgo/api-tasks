import {Request, Response} from "express";
import Task from "../models/Task";
import CreateTasks from "../utils/CreateTasks";

class TaskController {

    async bulkInsert(req: Request, res: Response){
        let tasks = []
        for (let i=0; i<50; i++){
            tasks.push(CreateTasks.newTask())
        }
        console.log(tasks.length)
        try {
            await Task.insertMany(tasks)
            res.status(201).json({
                "message":"Many Task has ben inserted"
            })
        }catch (e){
            res.status(500).json({
                "message":"Error internal"
            })
        }
    }

    async addTask(req: Request, res: Response) {

        let task = req.body;

        console.log(task)
        try {
            let newTask = Task(task);
            await newTask.save();

            res.status(201).json({
                "message": "Task Created"
            });
        }catch (e){
            res.status(500).json({
                "message":"Error Server"
            })
        }

    }

    async getTasks(req:Request, res: Response){

        let {status} = req.query;
        let task = await Task.find({status:status});
        let message = status == 'true' ? 'Tasks Completed' : 'Task Pending';
        res.status(200).json({
            "message":message,
            "data":task
        });
    }

    async searchTask(req: Request, res: Response) {
        let {q} = req.query;
        console.log(q)
        try {
            let tasks = await Task.find({description: {$regex: `.*${q}.*`, $options:'i'} })
            res.status(200).json({
                "message":"Result Search",
                "data": tasks
            });

        }catch (e){
            res.status(500)
        }
    }

    async updateTask(req: Request, res: Response){
        let {id} = req.params;
        let new_task = req.body;

       try {
           let task = await Task.findById(id)

           if(task){

                if(task.status == true){
                    res.status(400).json({
                        "message":"Task been Completed, not modified"
                    });
                    return;
                }

                await Task.updateOne({_id: id}, new_task)

               res.status(200).json({
                   "message":"Task Been Updated"
               })

           }else {
               res.status(404).json()
           }

       }catch (e){
           console.log(e);
           res.status(500).json()
       }
    }

    async deleteTask(req: Request, res: Response){
        let {id} = req.params;

        try {
            let task = await Task.findOneAndRemove({_id:id},{
                rawResult:true
            })
            console.log(task.value)

            if(task.value == null){
                res.status(404).json()
            }else{
                res.status(200).json({
                    "message": "Task Deleted"
                })
            }

        }catch (e){
            res.status(500).json()
        }


    }

}
export default new TaskController();
