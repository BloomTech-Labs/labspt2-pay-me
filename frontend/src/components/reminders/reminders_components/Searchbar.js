
 
 import React, {Component} from 'react'
 import SearchInput, {createFilter} from 'react-search-input' 
       
      const KEYS_TO_FILTERS = ['customInfo.custom_name', 'customInfo.invoice_number', ]
      const invoices= [{
        id: 1,
        customInfo: {
          custom_name: 'Joey McGuire',
          invoice_number: '#2315',
        }},{
        id: 2,
        customInfo: {
          custom_name: 'Rachel Bilson',
          invoice_number: '#2314',
        }},{
        id: 3,
        customInfo: {
          custom_name: 'Ross Geller',
          invoice_number: '#2313',
        }},]
      class  Searchbar  extends Component {
        constructor (props) {
          super(props)
          this.state = {
            searchTerm: ''
          }
         
        }
       
        render () {
          const filteredEmails = invoices.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
       
          return (
            <div className="reminderInput boxShadow">
     
              <SearchInput  onChange={this.searchUpdated} />
              {filteredEmails.map(infoCustom => {
                return (
                  <div className="mail" key={invoices.id}>
                    <div className="info">{infoCustom.customInfo.custom_name +''+ infoCustom.customInfo.invoice_number}</div>
                    
                  </div>
                )
              })}
            </div>
          )
        }
       
        searchUpdated = (term) => {
          this.setState({searchTerm: term})
        }
      }
       

export default Searchbar;