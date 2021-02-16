import React, {Fragment} from 'react';
import Card from "../components/Card/Card";

//const UrlBase = "assets/data.json"
const API ="http://www.omdbapi.com/?i=tt3896198&apikey=92152bb7"

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            searchTerm: "",
            error:"",
            isFetch: true
        }
    }

    async componentDidMount () {
        const response = await fetch(`${API}&s=batman`)
        const responseJson = await response.json()
        //console.log(responseJson.Search)
        this.setState ({ data: responseJson.Search, isFetch: false })

        /* fetch("assets/data.json")
            .then(response => response.json())
            .then(responseJson => this.setState ({ data: responseJson, isFetch: false }))
            .catch(err => {
                console.log("Error: " + err)}) */
    } 


    async handleSubmit(e){
        e.preventDefault()
        if(!this.state.searchTerm){
            return this.setState({error: "Texto invalido"})
        }
        
        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json()
        //console.log(data.Search)
        this.setState ({ data: data.Search, isFetch: false })

    }
    render() {
        
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offser-md-4 p-4">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input type="text" className="form-control" placeholder="Search..."
                                    onChange={e => this.setState({searchTerm: e.target.value})}
                                    autoFocus
                            />
                        </form>
                        <p className="text-white">{this.state.error ? this.state.error : "" }</p>
                    </div>
                </div>
                <div className="row">
                {
                    this.state.data.map(movie => {
                        return <Card key={movie.imdbID} movie = {movie} />
                    })
                }
                </div> 
            </Fragment>
             
        )
           
    }
}

export default List