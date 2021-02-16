import React from 'react';
import Card from "../components/Card/Card";

//const UrlBase = "assets/data.json"
const API ="http://www.omdbapi.com/?i=tt3896198&apikey=92152bb7"

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isFetch: true
        }
    }

    async componentDidMount () {
        const response = await fetch(`${API}&s=batman`)
        const responseJson = await response.json()
        console.log(responseJson.Search)
        this.setState ({ data: responseJson.Search, isFetch: false })

        /* fetch("assets/data.json")
            .then(response => response.json())
            .then(responseJson => this.setState ({ data: responseJson, isFetch: false }))
            .catch(err => {
                console.log("Error: " + err)}) */
    } 

    render() {
        
        return (
            <div className="row">
            {
                this.state.data.map(movie => {
                    return <Card key={movie.imdbID} movie = {movie} />
                })
            }
            </div>  
        )
           
    }
}

export default List