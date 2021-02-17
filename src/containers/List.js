import React, {Fragment} from 'react';
import Card from "../components/Card/Card";

//const API = "assets/data.json" //Si usara los archivos desde local la ubicación debo darsela iniciando desde Public/index.html


const API = process.env.REACT_APP_API;

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            searchTerm: "",
            error:"",
            loading: true
        }
    }

    async componentDidMount () {
        const response = await fetch(`${API}&s=batman`)
        const responseJson = await response.json()
        //console.log(responseJson.Search)
        this.setState ({ data: responseJson.Search, loading: false })

        /* fetch("assets/data.json")
            .then(response => response.json())
            .then(responseJson => this.setState ({ data: responseJson, loading: false }))
            .catch(err => {
                console.log("Error: " + err)}) */
    } 


    async handleSubmit(e){
        
        e.preventDefault()
        
        if(!this.state.searchTerm){
            return this.setState({error: "Ingrese un texto valido"})
        }
        
        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json()

        if (!data.Search){
            return this.setState({error:"No hay resultados para: " + this.state.searchTerm, searchTerm: ""});
        }
        
        this.setState({ data: data.Search, loading: false, error:"",searchTerm: "" })
    }

    render() {
        
        const {data, loading} = this.state;

        if(loading){
            return <h3 className="text-light">Loading...</h3>
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offser-md-4 p-4">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input type="text" className="form-control" placeholder="Search..."
                                    onChange={e => this.setState({searchTerm: e.target.value})}
                                    value={this.state.searchTerm}
                                    autoFocus
                            />
                        </form>
                        <p className="text-white">{this.state.error ? this.state.error : "" }</p>
                    </div>
                </div>
                <div className="row">
                {
                    data.map(movie => {
                        return <Card key={movie.imdbID} movie = {movie} />
                    })
                }
                </div> 
            </Fragment>
             
        )
           
    }
}

export default List