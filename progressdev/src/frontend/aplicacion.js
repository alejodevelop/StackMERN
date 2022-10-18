import React, {Component} from 'react';

class App extends Component{
    constructor(){
        super();
        this.state={
            _id:'',
            user:'',//document.getElementsByName("user"),
            pass:'',//document.getElementsByName("pass")
            tarea:[]
        };
        this.agregarTarea=this.agregarTarea.bind(this);
        this.manejador=this.manejador.bind(this);
        this.obtenerTareas=this.obtenerTareas.bind(this);
    }

    componentDidMount()
    {
        this.obtenerTareas();
    }

    manejador(e){
        //console.log(e.target.value+"hola");
        //console.log("holap");
        const {name,value}=e.target;
        this.setState({
            [name]:value
        });
    }

    editarTarea(id){
        fetch("/api/tasks/"+id)
        .then(res=>res)
        .then(data=>{
            this.setState({
                user:data.user,
                pass:data.pass,
                _id:data._id
            })
        });
    }

    eliminarTarea(e){
        if(confirm("estas seguro de que quieres eliminar este usuario?")){
        console.log(e);
        fetch('/api/tasks/'+e,{
            method:'DELETE',
            //body:JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(data=>{console.log(data);
        this.obtenerTareas()})
        .catch(err=>console.log("error = "+err));
        }
    }

    obtenerTareas(){
        fetch('/api/tasks')
        .then(res=>res.json())
        .then(data=>{this.setState({tarea:data});
        console.log(this.state.tarea);
    });
    }

    agregarTarea(e){
        if(this.state._id){
            fetch("/api/tasks/"+this.state._id,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.JSON())
            .then(data=>{
                this.setState({_id:'',user:'',pass:''})
            });
        }else{
        console.log("presione el boton");
        console.log(this.state);
        fetch('/api/tasks',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>console.log(res))
        .then(data=>{
            console.log(data)
            M.toast({html:'Task Saved'});
            this.setState({user:'',pass:''});
            this.obtenerTareas();
        })
        .catch(err=>console.log(err));
        e.preventDefault();//evita refrescar la pagina con el submit
    }
    }


    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">
                            MERN Stack ASDF
                        </a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.agregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="user" value={this.state.user}onChange={this.manejador} type="text" placeholder="Usuario"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="pass" value={this.state.pass} onChange={this.manejador} placeholder="Password" className="materialize-textarea"/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Registrar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead><tr><th>Usuario</th><th>Password</th></tr></thead>
                                <tbody>{
                                    this.state.tarea.map(tarea=>{
                                        return(
                                            <tr key={tarea._id}>
                                                <td>{tarea.user}</td>
                                                <td>{tarea.pass}</td>
                                                <td>
                                                    <button className="btn light-green darken-4" onClick={()=>this.editarTarea(tarea._id)}><i className="material-icons">edit</i></button>
                                                    <button className="btn red darken-4" onClick={()=>this.eliminarTarea(tarea._id)/*this.eliminarTarea*/}><i className="material-icons">delete</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;