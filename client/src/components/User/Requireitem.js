import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Requireitem extends Component {
  state =
    {
      requirements: [],
      reqavailable:false
    };

  calcTime(timestamp) {
    var x = new Date(timestamp);
    var y = new Date();
    var diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    if (diff < 3600) {
      var val = parseInt(diff / 60);
      if (val != 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      var val = parseInt(diff / 3600);
      if (val != 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      var val = parseInt(diff / 86400);
      if (val != 1)
        return val + ' days ago';
      else
        return val + ' day ago';
    }
  }

  getReq=()=> {
    if(this.props.user){
      console.log(this.props.user.username);
      axios.get('/api/getownreq',{
      params: {
        username:this.props.user.username
      }
    }).then(res => {
      console.log(res.data[0]);
      this.setState(
        {
          requirements: res.data,
          reqavailable: true
        });
    });
  }
  }


  render() {
    var x = this.state.requirements;
    x.reverse();
    if(this.props.user&&!this.state.reqavailable)
    {
      this.getReq();
    }
    var y = []
    for (var i = 0; i < x.length / 2; i++)
      y.push(i);
    var t = this.state.requirements.length > 0 ?
      (y.map((index) => {
        return (
          <div className="container req-container">
            <div className="row">
              <div className="col-sm-6">
                <div className="card req-card">
                  <div className="card-body req-card-body">
                    <div key={index}>
                      <div className="card-title req-card-title"><strong>{x[index * 2].title}</strong></div>
                      <div className="card-text req-card-text username">{x[index * 2].username}</div>
                      <div className="card-text req-card-text desc">{x[index * 2].desc}</div>
                      <div className="card-text req-card-text time"><small className="text-muted">{this.calcTime(x[index * 2].timestamp)}</small></div>
                    </div>
                  </div>
                </div>
              </div>
              {index * 2 + 1 < x.length &&
                <div className="col-sm-6">
                  <div className="card req-card">
                    <div className="card-body req-card-body">
                      <div key={index}>
                        <div className="card-title req-card-title"><strong>{x[index * 2 + 1].title}</strong></div>
                        <div className="card-text req-card-text username">{x[index * 2 + 1].username}</div>
                        <div className="card-text req-card-text desc">{x[index * 2 + 1].desc}</div>
                      <div className="card-text req-card-text time"><small className="text-muted">{this.calcTime(x[index * 2 + 1].timestamp)}</small></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        )
      })) : (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No requirements to display</h2>
      );
    return t;
  };
}
const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}


export default connect(mapStateToProps)(Requireitem);