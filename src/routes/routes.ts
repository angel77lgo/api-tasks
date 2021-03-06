import {Router} from "express";
import TaskController from "../controllers/TaskController";

class Routes {
    router: Router = Router();

    constructor() {
        this.config()
    }

    config(): void{
        this.router.post("/task", TaskController.addTask)
        this.router.get("/task", TaskController.getTasks)
        this.router.get('/task/search', TaskController.searchTask)
        this.router.post('/task/bulk',TaskController.bulkInsert)
        this.router.put('/task/:id', TaskController.updateTask)
        this.router.delete('/task/:id', TaskController.deleteTask)
    }
}
const routes = new Routes();
export default routes.router;
