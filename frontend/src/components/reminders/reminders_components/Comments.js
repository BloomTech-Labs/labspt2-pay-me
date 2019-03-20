import React, { Component } from 'react';
import Textarea from './Textarea';
 
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:  [],
    };
  }
 
  render() {
    return (
<div class="commentsection" >
<div class="row">
    <div class="col s12 ">
      <div class="card-panel comentpanel">
        <span class=" spanComment">Add a comment!
        </span>
        <Textarea value =''/>
      </div>
    </div>
  </div>
 
</div>
    );
  }
}
 
export default Comments;
   