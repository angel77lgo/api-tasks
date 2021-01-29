import {Request, Response} from "express";
import Task from "../models/Task";

class TaskController {

    async addTask(req: Request, res: Response) {

        let {task} = req.body;
        console.log(task)
        try {
            let newTask = Task(task);
            let t = await newTask.save();

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
        let tasks = await Task.find({description: {$regex: `.*${q}.*`, $options:'i'} })
        res.json(tasks)
    }

}
export default new TaskController();
