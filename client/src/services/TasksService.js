import axios from 'axios';

export default class TasksService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000'
    }

    getMyTasks() {
        return axios.get(`${this.BASE_URL}/tasks`, { headers: this.getHeaders() })
    }
    
    addTasks(label) {
        return axios.post(`${this.BASE_URL}/tasks`,
                { label },
                { headers: this.getHeaders() });
    }

    deleteTask(id) {
        return axios.delete(`${this.BASE_URL}/tasks/${id}`,
            { headers: this.getHeaders() });
    }

    updateTask(task) {
        return axios.put(`${this.BASE_URL}/tasks/${task._id}`,
            task,
            { headers: this.getHeaders() });
    }

    generateTodos() {
        const todos = [];
        for (let i = 0; i < 10; i++) {
            todos.push({
                id: i,
                label: 'Eat bread ' + (i % 2 === 0),
                done: (i % 2 === 0)
            });
        }    
        todos.push({
            id: 123,
            label: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis ipsum dolor, a egestas enim accumsan nec. Nullam porta odio ut mollis elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc tincidunt ex quis sapien congue eleifend. Integer mattis nunc non enim rhoncus, in maximus eros scelerisque. Integer lobortis sollicitudin libero, sit amet consectetur felis consequat quis. Integer et finibus lacus. Sed scelerisque mauris vel turpis luctus, nec elementum tellus efficitur. Duis sit amet scelerisque nisl.`,
            done: true
        })
     
        return todos;
    }

    getHeaders() {
        return {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RhYzcwMTZhNGQyODRiNjkyMGFhZDAiLCJpYXQiOjE1NTc5MTQ4NTV9.cAr6RJse02HNu6xBXXhwhTuNTkJTbGf9ecsQsUK5CHM"
        }
    }
}