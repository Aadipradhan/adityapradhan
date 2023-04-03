/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    
    //this method is used to send custom event to parent component upon clicking of Adjust Quote Button
    handleAdjustQuoteBtn(){
         let custEvent = new CustomEvent('adjustquote',{bubbles : true, detail : {"openModal": true}});
        this.dispatchEvent(custEvent);
    }
}