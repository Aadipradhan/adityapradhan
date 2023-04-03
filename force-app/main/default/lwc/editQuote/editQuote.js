/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire } from "lwc";

//importing methods from Apex
import getQuote from '@salesforce/apex/QuoteDto.getQuotebyRecId';
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';

//importing methods for Toast events and refreshing apex data
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class EditQuote extends LightningElement {
  @api recordId;
  quoteData = {};
  tempStartDate;
  tempEndDate;
  wiredData;

  //wire method used to query data from apex
  @wire(getQuote, { recordId: '$recordId' })
  quote(result) {
    this.wiredData = result
    if (result.data) {
      this.quoteData = JSON.parse(JSON.stringify(result.data));
      console.log('Quotedata : ', this.quoteData);
    }
    else if (result.error) {
      console.error('Error while fetching data->', error)
    }
  }

  //this method is used to store the changed date values
  handleDateChange(event) {
    switch (event.target.name) {
      case 'startDate':
        this.tempStartDate = event.target.value;
        break;
      case 'endDate':
        this.tempEndDate = event.target.value;
        break;
    }
  }

  //this method is used to save the quote data to database
  handleSave() {
    this.quoteData.startDate = (this.tempStartDate != undefined) ? this.tempStartDate : this.quoteData.startDate ;
    this.quoteData.endDate = (this.tempEndDate != undefined) ? this.tempEndDate : this.quoteData.endDate;

    updateQuote({ quoteData: this.quoteData })
      .then(() => {
        console.log('Update');
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Saved Quote Details',
            variant: 'success'
          })
        );
        refreshApex(this.wiredData);
      })
      .catch((error) => {
        console.error('Error from Update', error)
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error',
            message: 'Error in updating record.',
            variant: 'error'
          })
        );
      })
  }


}
