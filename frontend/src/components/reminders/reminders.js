import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchInput, {createFilter} from 'react-search-input' ;
import axios from 'axios';
import Sidenav from '../nav/Sidenav'
import './reminder.css';
import {Route} from "react-router-dom";
import { css } from '@emotion/core';
import { ClimbingBoxLoader} from 'react-spinners';
import serverLoc from '../../serverLoc';
const decode = require('jwt-decode');

// Key for Searching invoices
const KEYS_TO_FILTERS = ['invoice.invoice_number', 'client.client_name', ]
function styleFn(provided, state) {
  return { ...provided, color: state.isFocused ? 'black' : 'red' };
}    
const options = [
          { value: '3600 ', label: 'Daily' },//value in milliseconds 1min --3600s 86400000--daily
          { value: '604800000', label: 'Weekly' },
          { value: '2592000000', label: 'Monthly' },
          { value: '', label: 'Custom' }
        ];

  const buttonReminder=(a,b)=> {
          if (a || b) {
           // return<Link to={`/`}  className="btn waves-effect waves-light" type="submit" name="action">Start Reminders</Link>
            return <button className="btn blue add-btn"><i className="material-icons left">av_timer</i>Start Reminders</button>;
          }
          return null;
        }
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      data_invoice:[],
      data_invoices:[],
      //Comments can be stored in the db 
      comments:  [],
     commentText: '',
     invoiceUserClientInfo: [],
      //Comments 
      invoice :[],
      selectedOption: '',
      Email_Subject:'',
      Email_CustomText:'',
      Email_Template:null,
      Email_Status:false,
      Email_StartDate:new Date(),
      Email_Freq:'',
      Email_Freq_label:'',
      Sms_Freq_label:'',
      Sms_Status:true,
      Sms_StartDate:new Date(),
      Sms_Freq:'',
      Sms_CustomText:'',
      Sms_Template:null,
      isCheckedEmail: props.isCheckedSms || true,
      isCheckedSms: props.isCheckedSms || true,
      isClickedInvoice:'',
      isLoading: true ,
      filteredInvoice:[],
      isInvoiced:false,
      isRemindersSent:true,
      reminders_data:[],
      isHidding:true,
      isHidding2:false
    }
}

handleCommentChange =(ev) =>{

  this.setState({commentText: ev.target.value});
}
handleInputChange = ev => {
  this.setState({ [ev.target.name]: ev.target.value });
  ev.preventDefault();
};

handleChangeDateSms=(date) =>{
  this.setState({
    Sms_StartDate: date,
  });
}

handleChangeDateEmail=(date) =>{
  this.setState({
    Email_StartDate:date
  });
}
handleInputChange2 = ev => {
  this.setState({ [ev.target.name]: ev.target.value });
 
  ev.preventDefault();
};

handleInputChange = ev => {
  this.setState({ [ev.target.name]: ev.target.value });
 
  ev.preventDefault();
};

handleChangeFreqEmail = (selectedOption) => {
  this.setState({ 
    Email_Freq: selectedOption.value,
    Email_Freq_label:selectedOption.label
   }
    )
 
}

handleChangeFreqSms = (selectedOption) => {
  this.setState({ 
    Sms_Freq: selectedOption.value,
    Sms_Freq_label:selectedOption.label
   }
    )
}


handleAddComment=(event) => {
  if (event.target.value !== "") {
    const newComment = {
      commentText: this.state.commentText,
      key: Date.now()
    };
    this.setState((prevState) => {
      return { 
        comments: prevState.comments.concat(newComment),
        commentText: '',
      };
    });
    event.preventDefault()
    
  }}
  
  searchUpdated = (term) => {
    this.setState({searchTerm: term})
  }
invoiceData2 =(id)=>{ //1.get index of current Invoice 2.Get data user - client for each invoice 3. fill form with curent invoice data

  const filteredInvoice2 = this.state.data_invoices.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

  const index = filteredInvoice2.map(e => e.invoiceNumber).indexOf(id);
  this.setState({invoiceUserClientInfo: filteredInvoice2[index]});
    this.handleChangeActivInvoice(filteredInvoice2[index].invoiceNumber)
    console.log(this.state.invoiceUserClientInfo.invoiceNumber)
}
invoiceData =(id)=>{ //1.get index of current Invoice 2.Get data user - client for each invoice 3. fill form with curent invoice data
 console.log(id)
  if(this.state.data_invoices){
    const filteredInvoice2 =this.state.data_invoices.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
  const index = filteredInvoice2.map(e => e.invoice.invoice_number).indexOf(id);
  this.setState({invoiceUserClientInfo: filteredInvoice2[index],
    isHidding2:true});
    this.handleChangeActivInvoice(filteredInvoice2[index].invoice.invoice_number)
  }
  this.getData_reminders_sent(id)
}

handleStartReminders = (e) => {
    e.preventDefault();
    const {comments,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
       Email_Freq,Email_Freq_label,Sms_Freq_label,isCheckedEmail,isCheckedSms,Sms_StartDate,Sms_Freq,Sms_CustomText,Sms_Template}= this.state;
       const invoiceNumber=this.state.invoiceUserClientInfo.invoice.invoice_number;
       const invoicePdfLink=this.state.invoiceUserClientInfo.invoice.inv_url;
       const Email_From = this.state.invoiceUserClientInfo.user.email;
       const Email_to= this.state.invoiceUserClientInfo.client.email;
       const Sms_From = this.state.invoiceUserClientInfo.user.phone_number||17323335835;
       const Sms_to= this.state.invoiceUserClientInfo.client.phone_number;
       const { UserName} =  this.state.invoiceUserClientInfo.user.username;
       const {clientName} = this.state.invoiceUserClientInfo.client.client_name;
      const data ={
        comments,
        Email_Subject,
        Email_CustomText,
        Email_Template,
        Email_StartDate,
        Email_Freq,
        Sms_StartDate,
        Email_From,
        Email_to,
        Sms_From,
        Sms_to,
        Sms_Freq,
        Sms_CustomText,
        Sms_Template,
        isCheckedEmail,
        isCheckedSms,
        invoicePdfLink,
        invoiceNumber,
      };

      const url =`${serverLoc}/api/reminders/send`;
      const token = localStorage.getItem('jwt');
      const header ={headers: {'Authorization': token,}}
      axios.post( url, data,header )
      .then(response => {
        this.setState({reminders : response.data})
        console.log(response) 
       })
       .catch(err => {
         console.log("IN CATCH", err);
       });
      {/* axios
      .post(`http://localhost:3111/`,
      {
        comments,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
        Email_Freq,Sms_StartDate,Email_From,Email_to,Sms_From,Sms_to,Sms_Freq,
        Sms_CustomText,Sms_Template,isCheckedEmail,isCheckedSms,invoicePdfLink,invoiceNumber, UserName,clientName
      })
      .then(response => {
       // this.setState({reminders : response.data})
      console.log(response) 
      })
      .catch(err => {
        console.log("IN CATCH", err);
      });
     /* this.setState({
        reset forms input field :''
      })
      const DataTobeSaved={Email_StartDate,
        Sms_StartDate,Email_Freq_label,Sms_Freq_label,
        isCheckedEmail,isCheckedSms,invoiceNumber}
      this.handleSaveReminders(DataTobeSaved,e)*/}
      const DataTobeSaved={
        email_startdate:Email_StartDate,
        sms_startdate:Sms_StartDate,
        email_freq_label:Email_Freq_label,
        sms_freq_label:Sms_Freq_label,
        ischecked_email:isCheckedEmail,
        ischecked_sms:isCheckedSms,
        invoice_number:invoiceNumber}
        console.log( DataTobeSaved)
      this.handleSaveReminders(DataTobeSaved,e)
     //window.location.reload();
  };
  
  handleSaveReminders = (data,e) => {
     e.preventDefault();
     const url =`${serverLoc}/api/reminders/save`;
     const token = localStorage.getItem('jwt');
     const header ={headers: {'Authorization': token,}}
     axios.post( url, data,header )
      .then(response => {
        //this.setState({reminders : response.data})
        console.log(response)
      })
      .catch(err => {
        console.log("IN CATCH", err);
      });
     /* this.setState({
        reset forms input field :''
      })*/
   
      window.location.reload();
  };
  handleChangeActivEmail=()=> {
    this.setState({ isCheckedEmail:!this.state.isCheckedEmail})
  }

  handleChangeActivSms=()=> {
    this.setState({ isCheckedSms:!this.state.isCheckedSms})
  };
  handleChangeActivInvoice=(invoiceNumber)=> {
    this.setState({ isClickedInvoice:  invoiceNumber })
  };
  getData_reminders_sent = async (id) =>{

    const url =`${serverLoc}/api/reminders/view`;
     const token = localStorage.getItem('jwt');
     const header ={headers: {'Authorization': token,}}

     const res = await axios.get( url,header );

    //const url =`${serverLoc}/api/reminders/view`;
    //const res = await axios('http://localhost:5000/api/reminders/view');


   const datarem= res.data.filter(item=>{
      return item.invoice_number===id
   })
     if(datarem[0]){
   
      console.log(datarem[0])
       this.setState({ isRemindersSent:true,
      reminders_data:datarem[0],
      isHidding:false
    })
     }else{
      console.log('No data') 
      this.setState({ isRemindersSent:false})
     }
      // console.log(id)
       
 }

 dateConvert =(xdate)=>{
  const currentDate = new Date(xdate);
  const date = currentDate.getDate();
  const month = currentDate.getMonth()+1; //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours()
  const isPM = currentDate.getHours() >= 12;
  const isMidday = currentDate.getHours() == 12;
  const minutes = currentDate.getMinutes();
  const secondes = currentDate.getSeconds();
  return (`${month}/${date }/${ year} at ${hours } :${minutes}:${secondes || '00'} ${(isPM ? 'PM' : 'AM')}`)
 }

  componentDidMount(){
    
    const token = localStorage.getItem('jwt');
    const id = decode(token).subject; // I had the user_id stored inside a subject field -Jason
    const url =`${serverLoc}/api/reminders/invoices/${id}`;
    axios.get( url, {headers: {'Authorization': token,}})
    .then(response => {
      console.log(response)
    if(response.data[0].length!==0||response.data[0].length!==undefined){
      this.setState({data_invoices : response.data,
        invoiceUserClientInfo:response.data[0],
        isLoading:false,
        isHidding:true })
    }
    else{
console.log('hhhhhhhhhhh')
    }
  })
      .catch(err => { /*...handle the error...*/
        console.log(err) 
                    this.setState({data_error:'err.data',errorstatus:true,
                    isInvoiced:true,
                    isHidding2:true})});
          ;  
            
  }
  render() {
    
    //const {  isLoading,isInvoiced } = this.state;
    const filteredInvoice = this.state.data_invoices.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div class="reminder">
<div class="row">{/*Top Nav*/ }
</div>
<div class="row">
<div class="col s12 m4 l2 navleft"> 
<Sidenav />
</div>
<div className="col s12 m8 l10 wrapperContainer">
<div className="wrapperContainer_send_reminders">
<div className={`isHidding${this.state.isHidding2}`}><i class="material-icons prefix">warning</i>Click an Invoice to start</div>
        {!this.state.isLoading&&filteredInvoice[0].invoice&&(<div>
            <div class="col s12 m4 l2 ">
          <div className="Searchbox ">
             <SearchInput  onChange={this.searchUpdated} className='search'/>
                 {filteredInvoice.map((itemInfo) => {
                 return (
                     <div className="mail" key={itemInfo.invoice.invoice_id}>
 <li  className={this.state.isClickedInvoice === itemInfo.invoice.invoice_number ? 'info invoice--clicked' : 'info '} 
                  onClick={(i) => this.invoiceData(itemInfo.invoice.invoice_number)}>
                  {itemInfo.client.client_name +'---'+ itemInfo.invoice.invoice_number}
                  </li>
                     </div>
                         )
                       })}
                     </div></div>    
           
           <div class="col s12 m4 l10 Section-Email-Sms-Comment">
           
           {!this.state.isRemindersSent&&(<div>
             <form className='Section-Email-Sms col s12 m12 l8' onSubmit={this.handleStartReminders}>
             <div className='switchbox boxstyle4 '>
             <div class="switch">
             <label ><span>Email Status :</span>
            
               <input type="checkbox" value={this.state.isCheckedEmail} onChange={this.handleChangeActivEmail} />
               <span class="lever"></span>
            
             </label>
           </div>
           <div class="switch">
             <label ><span>Sms Status :</span>
               <input type="checkbox" value={this.state.isCheckedSms} onChange={this.handleChangeActivSms} />
               <span class="lever"></span>
           
             </label>
           </div>
             </div>
           
           <div className='Section-Email '>
         
           <div className={`sectionboxcontact email${this.state.isCheckedEmail} boxstyle3`}>
           <div>
           <div className="">
                 </div>
                     </div>
                  <div class="email-compose-body">
                  <h4 class=" boxstyle5">Send Email</h4>
                  <div class="send-header"><div class="form-group">
                  <div class="input-field col s12 l6">
                   <span class="">Email_From:</span>
                   <input disabled id="icon_prefix" type="text" class=" validate boxstyle" value={this.state.invoiceUserClientInfo.user.email}/>
                 </div>
                  <div class="input-field col s12 l6">
                   <span class="">Email_to:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.client.email}/>
                 </div>
                 <div class="col s12 l6">
                   <span class="">Send first reminder on:</span>
                   <DatePicker
                 selected={this.state.Email_StartDate}
                 onChange={this.handleChangeDateEmail}
                 showTimeSelect
                 timeFormat="HH:mm"
             timeIntervals={3}
             dateFormat="MMMM d, yyyy h:mm aa"
             timeCaption="time"
               />
                 </div>
         
                 <div class="input-field col s12 l6">
                   <span class="">Then repeat :</span>
                   <Select 
                 value={this.state.selectedOption.value}
                 label={this.state.selectedOption.label}
                 onChange={this.handleChangeFreqEmail}
                 options={options}
                 styles={styleFn}
               />
                 </div>
                  </div>
         
                  <div class="form-group"><input class="form-control" name ="Email_Subject" value={this.state.Email_Subject} placeholder="Email Subject" onChange={this.handleInputChange2}/></div>
                  <div class="form-group"><textarea value={this.state.Email_CustomText} name="Email_CustomText" class="form-control" placeholder="Say Hi..." rows="10" onChange={this.handleInputChange2}></textarea></div>
                  </div>
                  <div id="compose-area"></div><div class="text-right mrg-top-30">
                  </div>
               
                  </div>
                 
                 </div>
          </div>
           <div className='Section-Sms'>
           <div className={`sectionboxcontact sms${this.state.isCheckedSms} boxstyle3`}>
                  <div class="email-compose-body">
                  <h4 class="c-grey-900 mB-20 boxstyle5">Send Sms</h4>
                  <div class="send-header"><div class="form-group">
                  <div class="input-field col s12 l6">
                   <span class="">Sms_From:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.user.phone_number||17323335835}/>
                 </div>
                  <div class="input-field col s12 l6">
                   <span class="">Sms_to:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.client.phone_number}/>
                 </div>
                 <div class=" col s12 l6">
                   <span class="">Send first reminder on:</span>
                   <DatePicker
                 selected={this.state.Sms_StartDate}
                 onChange={this.handleChangeDateSms}
                 showTimeSelect
                 timeFormat="HH:mm"
             timeIntervals={3}
             dateFormat="MMMM d, yyyy h:mm aa"
             timeCaption="time"
               />
                 </div>
         
                 <div class="input-field col s12 l6">
                   <span class="">Then repeat :</span>
                   <Select 
                  value={this.state.selectedOption.value}
                  label={this.state.selectedOption.label}
                  onChange={this.handleChangeFreqSms}
                  options={options}
               />
                 </div>
                  </div>
                  <div class="form-group"><textarea  value={this.state.Sms_CustomText} name="Sms_CustomText" class="form-control" placeholder="Say Hi..." rows="10" onChange={this.handleInputChange}></textarea></div>
                  </div>
                  <div id="compose-area"></div><div class="text-right mrg-top-30">
                  </div>
               
                  </div>
                 
                 </div>    
          </div> {buttonReminder(this.state.isCheckedEmail, this.state.isCheckedSms)}
          
          </form>
          <div className='col s12 m12 l3'>  
         <form class="sectionboxcontact boxstyle4" onSubmit={this.handleAddComment}>
         <h4 class="c-grey-900 mB-20">Add a Comment</h4>
         <ul className="ulComment">{this.state.comments.map( (comment) =>{
           return <li className="collection-item avatar licomment" key={comment.key}>
               <img src="https://i.ibb.co/pLfXZ0w/blank-profile-picture-973460-960-720.png" alt="" className="circle imagAvatar" />
               <span className="avatarli">{comment.commentText}</span>
             </li>
         })}
         
         </ul>
         <div class="form-group">
         <textarea name="compose" class="form-control" placeholder={''} rows="2" value={this.state.commentText} onChange={this.handleCommentChange}></textarea></div>
         <button class="btn waves-effect waves-light" type="submit" name="action">Add comment</button>
        
           </form></div>   </div>)||<div className={`isHidding${this.state.isHidding}`} >
           <ul class="collection rem_card_stats ">
           <li class={`collection-item avatar card_stats stats${this.state.reminders_data.ischecked_email}`}>
      <i class="material-icons circle bigicon">email</i>
      <div className="stats_body">
        <div className="stats_title">Email Reminders</div>
        <div className="stats_contents">
        <div className="stats_content1"><i class="material-icons  iconstyle">snooze</i>{this.dateConvert(`${this.state.reminders_data.email_startdate}`)}</div>
        <div className="stats_content2"><i class="material-icons  iconstyle">repeat</i>{this.state.reminders_data.email_freq_label}</div>
        </div>
      </div>
    </li>
    <li class={`collection-item avatar card_stats stats${this.state.reminders_data.ischecked_sms}`}>
      <i class="material-icons circle bigicon">sms</i>
      <div className="stats_body">
        <div className="stats_title">Sms Reminders</div>
        <div className="stats_contents">
        <div className="stats_content1"><i class="material-icons  iconstyle">snooze</i>{this.dateConvert(`${this.state.reminders_data.sms_startdate}`)}</div>
        <div className="stats_content2"><i class="material-icons  iconstyle">repeat</i>{this.state.reminders_data.sms_freq_label}</div>
        </div>
      </div>
    </li>
  </ul>
    </div>
  }
         </div> </div>
        )||(<section className='notinvoicecard'>  
          <p class="h3"><strong>Loading data ...</strong></p>
          <div className='PacmanLoader'>
                <ClimbingBoxLoader
                  css={override}
                  sizeUnit={"px"}
                  size={15}
                  color={'whitesmoke'}
                  loading={this.state.loading}
                /> </div>
          <p>...Oops no invoice found, please add an invoice!</p>
        </section>
        )}
      </div></div></div></div>
    );
  }}

export default Reminders;

