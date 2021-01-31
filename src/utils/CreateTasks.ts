class CreateTasks{

    actions = ["Crear","Modificar","Actualizar","Desplegar","Corrergir", "Debugear","Testear"]
    types = ["un endpoint", "una aplicación", "una pagina web", "una api","un microservicio","un crud"]
    framework = ["en Flask","en NodeJS","en Spring","en Laravel","en Play for Scala","en Deno","en Django"]

    newTask(){
        let message = this.actions[Math.floor(Math.random() * this.actions.length)] + " " + this.types[Math.floor(Math.random() * this.types.length)]
            + " " + this.framework[Math.floor(Math.random() * this.framework.length)];

        let duration = Math.floor(Math.random() * 300) + 61

        let recorded_time = (duration * (Math.floor(Math.random() * 21 ) + 80)) / 100
        let status = [true,false]

        return {
            "description": message,
            "duration": duration,
            "recordedTime": parseInt(recorded_time.toFixed()),
            "status": status[Math.floor(Math.random() * 2)]
        };

    }
}
export default new CreateTasks();
