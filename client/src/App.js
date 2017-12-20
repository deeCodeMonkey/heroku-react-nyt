import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Results from './Results';
import Search from './Search';

class App extends Component {

    state = {
        articles: [],
        savedArticles: [],
        keyword: '',
        startYear: '',
        endYear: ''
    }

    //load saved articles after mounting 
    componentDidMount() {
        this.loadSavedArticles();
    }


    loadSavedArticles = () => {
        axios.get('/saved')
            .then((response) => {
                this.setState({ savedArticles: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //Search
    handleSearchSubmit = (event) => {
        event.preventDefault();

        var body = {
            keyword: this.state.keyword,
            yearStart: this.state.startYear,
            yearEnd: this.state.endYear
        };

        axios.post('/scrape', body)
            .then((response) => {
                this.setState({
                    articles: response.data

                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };


  render() {
    return (
        <div className="Main">
            <div className="well">
                <div class="jumbotron">
                    <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
                </div>

                < Search onSubmit={this.handleSearchSubmit} onChange={this.handleInputChange} />
                <hr />

                <div className="Results well">
                    <h3>Results</h3>
                </div>
                {this.state.articles.map((article) => {
                    return (
                        <Results key={article.title} {...article} saveArticle={this.saveArticleOnClick} />
                    );
                })}

                <hr />

            </div>
        </div>
    );
  }
}

export default App;
