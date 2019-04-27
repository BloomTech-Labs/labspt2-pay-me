import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchInput, {createFilter} from 'react-search-input' ;
import axios from 'axios';
import './reminder.css';
<<<<<<< HEAD
import '../../Dashboard.css';
import Sidenav from '../nav/Sidenav';
=======
import {Route} from "react-router-dom";
import { css } from '@emotion/core';
import { ClimbingBoxLoader} from 'react-spinners';
//import './materialize.min.css';
//import './App.css';
<<<<<<< HEAD

>>>>>>> Started refactoring the frontEnd

=======
>>>>>>> Started default FrontEnd + errors handling but need to rename some parameters
// Key for Searching invoices
const KEYS_TO_FILTERS = ['invoice.invoice_number', 'client.client_name', ]
        
const options = [
          { value: '3600 ', label: 'Daily' },//value in milliseconds 1min --3600s 86400000--daily
          { value: '604800000', label: 'Weekly' },
          { value: '2592000000', label: 'Monthly' },
          { value: '', label: 'Custom' }
        ];

  const buttonReminder=(a,b)=> {
          if (a || b) {
           // return<Link to={`/`}  className="btn waves-effect waves-light" type="submit" name="action">Start Reminders</Link>
            return <button className="btn waves-effect waves-light" type="submit" name="action">Start Reminders</button>;
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
      isCheckedEmail: props.isCheckedSms || false,
      isCheckedSms: props.isCheckedSms || false,
      isClickedInvoice:InvoicesInfo[0].invoiceId,
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
        comments: prevState.comments.concat(newComment) 
      };
    });
    
    this.state.commentText=''
    event.preventDefault()
    
  }}
  
  searchUpdated = (term) => {
    this.setState({searchTerm: term})
  }
invoiceData2 =(id)=>{ //1.get index of current Invoice 2.Get data user - client for each invoice 3. fill form with curent invoice data

  const filteredInvoice2 = InvoicesInfo.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

  const index = filteredInvoice2.map(e => e.invoiceNumber).indexOf(id);
  this.setState({invoiceUserClientInfo: filteredInvoice2[index]});
    this.handleChangeActivInvoice(filteredInvoice2[index].invoiceNumber)
    console.log(this.state.invoiceUserClientInfo.invoiceNumber)
}
invoiceData =(id)=>{ //1.get index of current Invoice 2.Get data user - client for each invoice 3. fill form with curent invoice data
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
       const Email_From = this.state.invoiceUserClientInfo.user.user_email;
       const Email_to= this.state.invoiceUserClientInfo.client.client_email;
       const Sms_From = this.state.invoiceUserClientInfo.user.user_phonenumber;
       const Sms_to= this.state.invoiceUserClientInfo.client.client_phonenumber;
       const { UserName} =  this.state.invoiceUserClientInfo.user.user_name;
       const {clientName} = this.state.invoiceUserClientInfo.client.client_name;
      axios
      .post(`http://localhost:3111/api/reminders/send`,
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
      })*/
      const DataTobeSaved={Email_StartDate,
        Sms_StartDate,Email_Freq_label,Sms_Freq_label,
        isCheckedEmail,isCheckedSms,invoiceNumber}
     this.handleSaveReminders(DataTobeSaved,e)
     window.location.reload();
  };
  
  handleSaveReminders = (data,e) => {
     e.preventDefault();
    axios
      .post(`http://localhost:3111/api/reminders/save`,
      {data})
      .then(response => {
       // this.setState({reminders : response.data})
       //console.log(response) 
      })
      .catch(err => {
        console.log("IN CATCH", err);
      });
     /* this.setState({
        reset forms input field :''
      })*/
   
     // window.location.reload();*/
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
    
    const res = await axios('http://localhost:3111/api/reminders/view');
   const datarem= res.data.filter(item=>{
      return item.invoiceNumber===id
   })
    
     
     if(datarem[0]){
      const dataasss = new Date();
      console.log( dataasss.toDateString())
      // console.log('data')
       this.setState({ isRemindersSent:true,
      reminders_data:datarem[0],
      isHidding:false
    })
      console.log(this.state.reminders_data)
     }else{
      console.log('No data') 
      this.setState({ isRemindersSent:false})
     }
      // console.log(id)
       
 }
  componentDidMount(){
    async function getData(){
      const res = await axios('http://localhost:3111/api/reminders/invoices/5');
      return await res;
   } 
  getData().then(response => {
    console.log(response.data[0]) 
    if(response.data[0].lenght!==0||undefined){
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
                    this.setState({data_error:'err.data',errorstatus:true,
                    isInvoiced:true,
                    isHidding2:true})});
         console.log(this.state.data_invoices)  ; 
    
            
  }
  render() {
    
    //const {  isLoading,isInvoiced } = this.state;
    const filteredInvoice = this.state.data_invoices.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (

      <div class="reminder">
<<<<<<< HEAD
  <div className="row">
    <Sidenav />

<<<<<<< HEAD
  <div class="col s12 m8 l10 reminder-container"> 
  <h2 className="center">Reminders</h2>
=======
  <div class="col s12 m8 l10 boxstyle"> 
  
>>>>>>> styling search form and sms-email section
  <div class="col s12 m4 l2 ">{/*SEARCH INVOICE*/ }  
  <div className="Searchbox boxstyle4">
    <SearchInput  onChange={this.searchUpdated} className='search boxstyle4'/>
        {filteredInvoice.map((itemInfo) => {
=======
<div class="row">{/*Top Nav*/ }
<nav className='Topnav'>
<div class="nav-wrapper">
  <a href="#!" class="brand-logo">Reminders</a>
  <ul class="right hide-on-med-and-down">
    <li><a href="sass.html"><i class="material-icons left">home</i>Home</a></li>
    <li><a href="badges.html"><i class="material-icons right">sign</i>Sign out</a></li>
  </ul>
</div>
</nav>
</div>
<div class="row">
<div class="col s12 m4 l2 navleft"> 
<div class="collection leftNav">
    <a href="#!" class="collection-item">Invoices</a>
    <a href="#!" class="collection-item active">Reminders</a>
    <a href="#!" class="collection-item">Settings</a>
    <a href="#!" class="collection-item">Billing</a>
  </div>         
</div>
<div class="col s12 m8 l10 boxstyle">
<div ><div class={` isHidding${this.state.isHidding2}`}>Click an Invoice to start</div>
        {!this.state.isLoading&&filteredInvoice[0].invoice&&(<div>
            <div class="col s12 m4 l2 ">
          <div className="Searchbox boxstyle4">
             <SearchInput  onChange={this.searchUpdated} className='search boxstyle4'/>
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
             <form className='Section-Email-Sms' onSubmit={this.handleStartReminders}>
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
                  <h4 class="c-grey-900 mB-20 boxstyle5">Send Email</h4>
                  <div class="send-header"><div class="form-group">
                  <div class="input-field col s6">
                   <span class="">Email_From:</span>
                   <input disabled id="icon_prefix" type="text" class=" validate boxstyle" value={this.state.invoiceUserClientInfo.user.user_email}/>
                 </div>
                  <div class="input-field col s6">
                   <span class="">Email_to:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.client.client_email}/>
                 </div>
                 <div class=" col s6">
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
         
                 <div class="input-field col s6">
                   <span class="">Then repeat :</span>
                   <Select 
                 value={this.state.selectedOption.value}
                 label={this.state.selectedOption.label}
                 onChange={this.handleChangeFreqEmail}
                 options={options}
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
                  <div class="input-field col s6">
                   <span class="">Sms_From:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.user.user_phonenumber}/>
                 </div>
                  <div class="input-field col s6">
                   <span class="">Sms_to:</span>
                   <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.client.client_phonenumber}/>
                 </div>
                 <div class=" col s6">
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
         
                 <div class="input-field col s6">
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
        
           </form> </div>)|| <table class={`rwd-table isHidding${this.state.isHidding}`}>
    <tr>
      <th>Invoice Number : {this.state.reminders_data.invoiceNumber}</th>
      <th>Email Reminders</th>
      <th>Sms Reminders</th>
    </tr>
    <tr>
      <td>STARTS</td>
      <td ><span class="span-table">{this.state.reminders_data.Email_Startdate}</span></td>
      <td>{this.state.reminders_data.Sms_Startdate}</td>
    </tr>
    <tr>
      <td>REPEATS</td>
      <td>{this.state.reminders_data.Email_Freq_label}</td>
      <td>{this.state.reminders_data.Sms_Freq_label}</td>
    </tr>
  </table>}
         </div> </div>
        )||(<section className='notinvoicecard'>  
          <p class="h3"><strong>Loading data ...</strong></p>
          <div className='PacmanLoader'>
                <ClimbingBoxLoader
                  css={override}
                  sizeUnit={"px"}
                  size={15}
                  color={'#2f70e1'}
                  loading={this.state.loading}
                /> </div>
          <p>...Oops no invoice found, please add an invoice!</p>
        </section>
        )}
      </div></div></div></div>
    );
  }}

export default Reminders;

//           invoiceId:1,
//           invoicePdfLink:'#',
//           invoiceNumber:'#2314',
//           userInfo :{
//             UserName :'Martins Khol',
//             UserPhoneNumber:'+154',
//             UserEmail:'Khol@kholusa.io'
//           },
//           clientInfo:{
//             clientName:'Ross Geller',
//             clientEmail:'RossGellerDoe@doe.com',
//             clientPhoneNumber:'+178***'
//           }},
//           {
//             invoiceId:2,
//             invoicePdfLink:'#',
//             invoiceNumber:'#345',
//               userInfo :{
//                 UserName :'Martins Khol',
//                 UserPhoneNumber:'+154MK',
//                 UserEmail:'Khol@kholusa.io'
//             },
//             clientInfo:{
//               clientName:'Jane Doe',
//               clientEmail:'JaneDoe@doe.com',
//               clientPhoneNumber:'+179***'
//             }},
//             {
//               invoiceId:3,
//               invoicePdfLink:'#',
//               invoiceNumber:'#237',
//                 userInfo :{
//                 UserName :'Martins Khol',
//                 UserPhoneNumber:'+154MK',
//                 UserEmail:'Khol@kholusa.io'
//               },
//               clientInfo:{
//                 clientName:'Jonas Doe',
//                 clientEmail:'JonasDoe@doe.com',
//                 clientPhoneNumber:'+178***'
//               }},
//               {
//                 invoiceId:4,
//                 invoicePdfLink:'#',
//                 invoiceNumber:'#409',
//                 userInfo :{
//                   UserName :'MOMPASU',
//                   UserPhoneNumber:'17323335835',
//                   UserEmail:'witanday.cd@gmail.com'
//                 },
//                 clientInfo:{
//                   clientName:'Didi Doe',
//                   clientEmail:'ir.witanday@gmail.com',
//                   clientPhoneNumber:'19788718331'
//             }},]
        
// const options = [
//           { value: '1000', label: 'Daily' },//value in milliseconds 1min --3600s
//           { value: '604800000', label: 'Weekly' },
//           { value: '2592000000', label: 'Monthly' },
//           { value: '', label: 'Custom' }
//         ];

//   const buttonReminder=(a,b)=> {
//           if (a || b) {
//             return <button className="btn waves-effect waves-light" type="submit" name="action">Start Reminders</button>;
//           }
//           return null;
//         }
// class Reminders extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchTerm: '',
//       //Comments can be stored in the db 
//       comments:  [],
//      commentText: '',
//      invoiceUserClientInfo:InvoicesInfo[0],
//       //Comments 
//       invoice :[],
//       selectedOption: '',
//       Email_Subject:'',
//       Email_CustomText:'',
//       Email_Template:null,
//       Email_Status:false,
//       Email_StartDate:new Date(),
//       Email_Freq:'',
//       Sms_Status:true,
//       Sms_StartDate:new Date(),
//       Sms_Freq:'',
//       Sms_CustomText:'',
//       Sms_Template:null,
//       isCheckedEmail: props.isCheckedSms || false,
//       isCheckedSms: props.isCheckedSms || false,
//       isClickedInvoice:InvoicesInfo[0].invoiceId
//     }
// }

// handleCommentChange =(ev) =>{

//   this.setState({commentText: ev.target.value});
// }
// handleInputChange = ev => {
//   this.setState({ [ev.target.name]: ev.target.value });
//   ev.preventDefault();
// };

// handleChangeDateSms=(date) =>{
//   this.setState({
//     Sms_StartDate: date,
//   });
// }

// handleChangeDateEmail=(date) =>{
//   this.setState({
//     Email_StartDate:date
//   });
// }
// handleInputChange2 = ev => {
//   this.setState({ [ev.target.name]: ev.target.value });
 
//   ev.preventDefault();
// };

// handleInputChange = ev => {
//   this.setState({ [ev.target.name]: ev.target.value });
 
//   ev.preventDefault();
// };

// handleChangeFreqEmail = (selectedOption) => {
//   this.setState({ 
//     Email_Freq: selectedOption.value
//    }
//     )
 
// }

// handleChangeFreqSms = (selectedOption) => {
//   this.setState({ 
//     Sms_Freq: selectedOption.value
//    }
//     )
// }


// handleAddComment=(event) => {
 
//   if (event.target.value !== "") {
//     const newComment = {
//       commentText: this.state.commentText,
//       key: Date.now()
//     };
//     this.setState((prevState) => {
//       return { 
//         comments: prevState.comments.concat(newComment) 
//       };
//     });
    
//     this.state.commentText=''
//     event.preventDefault()
    
//   }}
  
//   searchUpdated = (term) => {
//     this.setState({searchTerm: term})
//   }
// invoiceData =(id)=>{ //1.get index of current Invoice 2.Get data user - client for each invoice 3. fill form with curent invoice data

//   const filteredInvoice2 = InvoicesInfo.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

//   const index = filteredInvoice2.map(e => e.invoiceNumber).indexOf(id);
//   this.setState({invoiceUserClientInfo: filteredInvoice2[index]});
//     this.handleChangeActivInvoice(filteredInvoice2[index].invoiceNumber)
//     console.log(this.state.invoiceUserClientInfo.invoiceNumber)
// }

// handleStartReminders = (e) => {
//     e.preventDefault();
//     const {comments,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
//        Email_Freq,isCheckedEmail,isCheckedSms,Sms_StartDate,Sms_Freq,Sms_CustomText,Sms_Template}= this.state;
//        const {invoicePdfLink,invoiceNumber}=this.state.invoiceUserClientInfo;
//        const Email_From = this.state.invoiceUserClientInfo.userInfo.UserEmail;
//        const Email_to= this.state.invoiceUserClientInfo.clientInfo.clientEmail;
//        const Sms_From = this.state.invoiceUserClientInfo.userInfo.UserPhoneNumber;
//        const Sms_to= this.state.invoiceUserClientInfo.clientInfo.clientPhoneNumber;
//        const { UserName} =  this.state.invoiceUserClientInfo.userInfo
//        const {clientName} = this.state.invoiceUserClientInfo.clientInfo
//       axios
//       .post(`http://localhost:5001/test`,
//       {
//         comments,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
//         Email_Freq,Sms_StartDate,Email_From,Email_to,Sms_From,Sms_to,Sms_Freq,
//         Sms_CustomText,Sms_Template,isCheckedEmail,isCheckedSms,invoicePdfLink,invoiceNumber, UserName,clientName
//       })
//       .then(response => {
//        // this.setState({reminders : response.data})
//        console.log(response) 
//       })
//       .catch(err => {
//         console.log("IN CATCH", err);
//       });
//      /* this.setState({
//         reset forms input field :''
//       })*/
   
//      // window.location.reload();*/
//   };
  
//   handleChangeActivEmail=()=> {
//     this.setState({ isCheckedEmail:!this.state.isCheckedEmail})
//   }

//   handleChangeActivSms=()=> {
//     this.setState({ isCheckedSms:!this.state.isCheckedSms})
//   };
//   handleChangeActivInvoice=(invoiceNumber)=> {
//     this.setState({ isClickedInvoice:  invoiceNumber })
//   };

 
// //COMMENT
//   render() {
//     const filteredInvoice = InvoicesInfo.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
//     return (
//       <div class="reminder">
//     <div class="row">{/*Top Nav*/ }
//     <nav className='Topnav'>
//     <div class="nav-wrapper">
//       <a href="#!" class="brand-logo">Reminders</a>
//       <ul class="right hide-on-med-and-down">
//         <li><a href="sass.html"><i class="material-icons left">home</i>Home</a></li>
//         <li><a href="badges.html"><i class="material-icons right">sign</i>Sign out</a></li>
//       </ul>
//     </div>
//   </nav>
//     </div>
// <div class="row">{/*LEFT Nav*/ } 
//   <div class="col s12 m4 l2 navleft"> 
//   <div class="collection leftNav">
//         <a href="#!" class="collection-item">Invoices</a>
//         <a href="#!" class="collection-item active">Reminders</a>
//         <a href="#!" class="collection-item">Settings</a>
//         <a href="#!" class="collection-item">Billing</a>
//       </div>          
//   </div>

//   <div class="col s12 m8 l10 boxstyle"> 
  
//   <div class="col s12 m4 l2 ">{/*SEARCH INVOICE*/ }  
//   <div className="Searchbox boxstyle4">
//     <SearchInput  onChange={this.searchUpdated} className='search boxstyle4'/>
//         {filteredInvoice.map((itemInfo) => {
>>>>>>> Started refactoring the frontEnd
          
//         return (
//             <div className="mail" key={itemInfo.invoiceId}>
//         <li  className={this.state.isClickedInvoice === itemInfo.invoiceNumber ? 'info invoice--clicked' : 'info '}  onClick={(i) => this.invoiceData(itemInfo.invoiceNumber)}>{itemInfo.clientInfo.clientName +'---'+ itemInfo.invoiceNumber}</li>
//             </div>
//                 )
//               })}
//             </div></div>    
  
//   <div class="col s12 m4 l10 Section-Email-Sms-Comment">{/*EMAIL&&SMS&&*/ }  

//     <form className='Section-Email-Sms' onSubmit={this.handleStartReminders}>
//     <div className='switchbox boxstyle4 '>
//     <div class="switch">
//     <label ><span>Email Status :</span>
   
//       <input type="checkbox" value={this.state.isCheckedEmail} onChange={this.handleChangeActivEmail} />
//       <span class="lever"></span>
   
//     </label>
//   </div>
//   <div class="switch">
//     <label ><span>Sms Status :</span>
//       <input type="checkbox" value={this.state.isCheckedSms} onChange={this.handleChangeActivSms} />
//       <span class="lever"></span>
  
//     </label>
//   </div>
//     </div>
  
//   <div className='Section-Email '>{/*&&EMAIL&&*/ } 

//   <div className={`sectionboxcontact email${this.state.isCheckedEmail} boxstyle3`}>
//   <div>
//   <div className="">
  
//         </div>
//             </div>
//          <div class="email-compose-body">
//          <h4 class="c-grey-900 mB-20 boxstyle5">Send Email</h4>
//          <div class="send-header"><div class="form-group">
//          <div class="input-field col s6">
//           <span class="">Email_From:</span>
//           <input disabled id="icon_prefix" type="text" class=" validate boxstyle" value={this.state.invoiceUserClientInfo.userInfo.UserEmail}/>
//         </div>
//          <div class="input-field col s6">
//           <span class="">Email_to:</span>
//           <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.clientInfo.clientEmail}/>
//         </div>
//         <div class=" col s6">
//           <span class="">Send first reminder on:</span>
//           <DatePicker
//         selected={this.state.Email_StartDate}
//         onChange={this.handleChangeDateEmail}
//         showTimeSelect
//         timeFormat="HH:mm"
//     timeIntervals={3}
//     dateFormat="MMMM d, yyyy h:mm aa"
//     timeCaption="time"
//       />
//         </div>

//         <div class="input-field col s6">
//           <span class="">Then repeat :</span>
//           <Select 
//         value={this.state.selectedOption.value}
//         onChange={this.handleChangeFreqEmail}
//         options={options}
//       />
//         </div>
//          </div>

//          <div class="form-group"><input class="form-control" name ="Email_Subject" value={this.state.Email_Subject} placeholder="Email Subject" onChange={this.handleInputChange2}/></div>
//          <div class="form-group"><textarea value={this.state.Email_CustomText} name="Email_CustomText" class="form-control" placeholder="Say Hi..." rows="10" onChange={this.handleInputChange2}></textarea></div>
//          </div>
//          <div id="compose-area"></div><div class="text-right mrg-top-30">
//          </div>
      
//          </div>
        
//         </div>
//  </div>
//   <div className='Section-Sms'>{/*&&**SMS**&&*/ }  
//   <div className={`sectionboxcontact sms${this.state.isCheckedSms} boxstyle3`}>
//          <div class="email-compose-body">
//          <h4 class="c-grey-900 mB-20 boxstyle5">Send Sms</h4>
//          <div class="send-header"><div class="form-group">
//          <div class="input-field col s6">
//           <span class="">Sms_From:</span>
//           <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.userInfo.UserPhoneNumber}/>
//         </div>
//          <div class="input-field col s6">
//           <span class="">Sms_to:</span>
//           <input disabled id="icon_prefix" type="text" class="validate" value={this.state.invoiceUserClientInfo.clientInfo.clientPhoneNumber}/>
//         </div>
//         <div class=" col s6">
//           <span class="">Send first reminder on:</span>
//           <DatePicker
//         selected={this.state.Sms_StartDate}
//         onChange={this.handleChangeDateSms}
//         showTimeSelect
//         timeFormat="HH:mm"
//     timeIntervals={3}
//     dateFormat="MMMM d, yyyy h:mm aa"
//     timeCaption="time"
//       />
//         </div>

//         <div class="input-field col s6">
//           <span class="">Then repeat :</span>
//           <Select 
//          value={this.state.selectedOption.value}
//          onChange={this.handleChangeFreqSms}
//          options={options}
//       />
//         </div>
//          </div>
//          <div class="form-group"><textarea  value={this.state.Sms_CustomText} name="Sms_CustomText" class="form-control" placeholder="Say Hi..." rows="10" onChange={this.handleInputChange}></textarea></div>
//          </div>
//          <div id="compose-area"></div><div class="text-right mrg-top-30">
//          </div>
      
//          </div>
        
//         </div>    
//  </div> {buttonReminder(this.state.isCheckedEmail, this.state.isCheckedSms)}
//  </form>

// <form class="sectionboxcontact boxstyle4" onSubmit={this.handleAddComment}>
// <h4 class="c-grey-900 mB-20">Add a Comment</h4>
// <ul className="ulComment">{this.state.comments.map( (comment) =>{
//   return <li className="collection-item avatar licomment" key={comment.key}>
//       <img src="https://i.ibb.co/pLfXZ0w/blank-profile-picture-973460-960-720.png" alt="" className="circle imagAvatar" />
//       <span className="avatarli">{comment.commentText}</span>
//     </li>
// })}

// </ul>
// <div class="form-group">
// <textarea name="compose" class="form-control" placeholder={''} rows="2" value={this.state.commentText} onChange={this.handleCommentChange}></textarea></div>
// <button class="btn waves-effect waves-light" type="submit" name="action">Add comment</button>
        
// </form>
             
//     </div>          
//   </div>
   
<<<<<<< HEAD
</div>
  </div>

=======


//   </div>

// </div>
>>>>>>> Started refactoring the frontEnd
   
//     );
//   }
// }

// export default Reminders;

  