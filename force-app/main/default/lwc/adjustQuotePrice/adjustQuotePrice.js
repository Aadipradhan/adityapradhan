/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
//importing methods from Apex
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';
//importing methods for Toast events 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class AdjustQuotePrice extends LightningElement {
 @api recordData;
  adjustedAmount = 0;

  connectedCallback() {
    this.quoteData = JSON.parse(JSON.stringify(this.recordData))
  }

  //this method stores the input from UI
  handleInputChange(event) {
    this.adjustedAmount = event.target.value;
  }

  // this method is invoked by parent and is gets data saved
  @api saveData() {
    this.quoteData.totalAmount = this.adjustedAmount;
    console.log('quoteData : ', this.quoteData);
    console.log('adjustedAmount : ', this.adjustedAmount);
    if (this.adjustedAmount != undefined) {
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
          let custEvent = new CustomEvent('closemodal', { bubbles: true, detail: { "closeModal": true } });
          this.dispatchEvent(custEvent);
        })
        .catch((error) => {
          console.error('Error from Update', JSON.stringify(error))
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

}
