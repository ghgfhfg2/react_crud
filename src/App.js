import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import Control from "./components/Control";
import Create from "./components/Create";
import Update from "./components/Update";
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.maxId = 3;
    this.state = {
      mode : "read",
      welcome:{title: "WEB", desc:"Hello, React!!"},
      subject:{
        title:'WEB',
        sub:'world wide web!'
      },
      selected_id:2,
      contents:[
        {id:1, title:'HTML', desc:'HTML is...'},
        {id:2, title:'CSS', desc:'CSS is...'},
        {id:3, title:'Javascript', desc:'Javascript is...'}
      ]
    }
  }
  getReadContent(){
    for(let i=0; i<this.state.contents.length; i++){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_id){         
        return data
      }
    }
  }
  getContent(){
    let _title, _desc, _article = null
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <Content title={_title} desc={_desc}></Content>
    }else if(this.state.mode === "read"){   
        var _content = this.getReadContent();
        _article = <Content title={_content.title} desc={_content.desc}></Content>       
    }else if(this.state.mode === "create"){
      _article = <Create
        onSubmit={function(_title,_desc){
          this.maxId = this.maxId+1;
          var _contents = this.state.contents.concat(
            {id:this.maxId, title:_title, desc:_desc}
          );
          this.setState({
            contents:_contents,
            mode:"read",
            selected_id:this.maxId
          })
          }.bind(this)}></Create>
    }else if(this.state.mode ==="update"){
      _content = this.getReadContent();
      _article = <Update
      data = {_content}
      onSubmit={function(_id,_title,_desc){ 
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc}            
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:"read"
        });
        }.bind(this)}></Update>
    }
    return _article;
  }
  render(){    
    return (
        <div className="App">
          <Subject title={this.state.subject.title} 
            sub={this.state.subject.sub}
            onChangePage={function(){
              this.setState({
                mode:"welcome"
              });
            }.bind(this)}
            >
          </Subject>          
          <TOC data={this.state.contents}
            onChangePage={function(id){
              this.setState({
                mode:"read",
                selected_id:Number(id)
              });
            }.bind(this)}
          >
          </TOC>
          <Control
            onChangeMode={function(_mode){
              if(_mode === 'delete'){
                  if(window.confirm('삭제하겠습니까?')){
                    var _contents = Array.from(this.state.contents);
                    for(var i=0; i<_contents.length; i++){
                      if(_contents[i].id === this.state.selected_id){
                        _contents.splice(i,1);
                        break;
                      }
                      this.setState({
                        mode:'welcome',
                        contents:_contents
                      });
                    }
                    alert('삭제되었습니다.')
                  }
              }else{
              this.setState({
                mode:_mode
              });
            }
            }.bind(this)}
          >
          </Control>
          {this.getContent()}
        </div>
      );
    }
}

export default App;
