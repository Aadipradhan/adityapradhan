/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire } from "lwc";

//import apex method
import getQuote from '@salesforce/apex/QuoteDto.getQuotebyRecId';
//import refresh method to refresh apex data
import { refreshApex } from '@salesforce/apex';

//importing child component
import QuoteModal from 'c/quoteModal';

export default class EditQuotePage extends LightningElement {
  @api recordId;

  quoteData = {};
  wiredData;

  //wire method to query the current Quote__c record
  @wire(getQuote, { recordId: '$recordId' })
  quote(result) {
    this.wiredData = result
    if (result.data) {
      this.quoteData = JSON.parse(JSON.stringify(result.data));
      console.log('Quotedata1 : ', this.quoteData);
    }
    else if (result.error) {
      console.error('Error while fetching data->', error)
    }
  }

  //method to listen the event fired from child component
  handleTotalSummaryEvent(event) {
    let showAdjustQuoteModal = event.detail.openModal;
    this.openAdjustQuoteModal(showAdjustQuoteModal);
  }

  //method used to invoke child modal component
  async openAdjustQuoteModal(isModal) {
    if (isModal == true) {
      const modalResponse = await QuoteModal.open({
        size: 'small',
        label: 'Adjust Quote Price',
        recordData: this.quoteData
      });
      if(modalResponse == 'closed'){
        refreshApex(this.wiredData);
      }

    }
  }


}
