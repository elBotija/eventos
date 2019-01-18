import React, { Component } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Eventos from './components/Eventos'

class App extends Component {

    token = '5AOEYM3NBTIUU7PYYSMS'

    state = {
        categorias: [],
        eventos: []
    }

    componentDidMount(){
        this.obtenerCategorias()
    }

    obtenerCategorias = async () => {
        let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`
        await fetch(url)
            .then(respuesta => {
                return respuesta.json()
            })
            .then(categorias => {
                this.setState({
                    categorias: categorias.categories
                })
            })
    }

    obtenerEventos = async (busqueda) => {
        const { nombre, categoria } = busqueda
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${nombre}&categories=${categoria}&sort_by=date&locale=es_AR&token=${this.token}`

        await fetch(url)
            .then(respuesta => {
                return respuesta.json()
            })
            .then(evento => {
                this.setState({
                    eventos: evento.events
                })
            })
    }

    render() {
        return (
            <div className="App">
                <Header title='Eventos'/>
                <div className='uk-container'>
                    <Formulario
                        categorias={this.state.categorias}
                        obtenerEventos={this.obtenerEventos}
                    />
                    <Eventos
                        eventos={this.state.eventos}
                    />
                </div>
                <p className='uk-text-center'><i>Powered by <a href="https://www.eventbriteapi.com">Eventbrite</a></i></p>
            </div>
        );
    }
}

export default App;
