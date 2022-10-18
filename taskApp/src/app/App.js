// este archivo contiene mi codigo de react que se vera en el frontend
// para que puedan leerse estos archivos jsx, debe instalarse babel
// para compilar todo el proyecto en un bundle, debe instalarse webpack


import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    addTask(e) {
        // evita que la pagina se refresce al presionar el boton
        e.preventDefault();

        // fetch sirve para enviar peticiones http al servidor
        // en method va el metodo http que se usara
        // en el body van los datos a enviar 
        // en los headers se especifica el tipo de dato que se va a enviar

        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Updated' }); // Toast es un mensaje flotante que aparece en el navegador 
                    this.setState({ title: '', description: '', _id: '' });
                    this.fetchTasks();
                })
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state), // este metodo sirve para convertir json a string
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Saved' }) // feature de materialize que permite mostrar un cuadro con un dialogo
                    this.setState({ title: '', description: '' })
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
        }

    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete the item?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task Deleted' });
                    this.fetchTasks();
                });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    // consulta al servidor para traer las tareas almacenadas en la base de datos
    // peticion get por default, no es necesario configurar 
    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    tasks: data
                });
            })
    }

    handleTyping(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });


    }

    render() {
        return (
            < div >
                {/* NAVIGATION */}
                <nav className="deep-purple darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className='row'>
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title"
                                                    onChange={this.handleTyping}
                                                    type="text"
                                                    placeholder="Task Title"
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description"
                                                    onChange={this.handleTyping}
                                                    type="text" placeholder="Task Description"
                                                    className="materialize-textarea"
                                                    value={this.state.description}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn deep-purple darken-4">
                                            {this.state._id != '' ? "Update" : "Send"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn deep-purple darken-4"
                                                            onClick={() => this.deleteTask(task._id)}
                                                        >
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn deep-purple darken-4"
                                                            style={{ margin: '4px' }}
                                                            onClick={() => this.editTask(task._id)}
                                                        >
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default App;

