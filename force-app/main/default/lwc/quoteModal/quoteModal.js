import { api } from "lwc";
import LightningModal from 'lightning/modal';
export default class QuoteModal extends LightningModal {

    @api recordData;
    //this method sends custom close event to parent
    handleCancel() {
        this.close('closed');
    }

    //this method send the data to parent and closes the modal
    handleSave(){
        this.refs.adjustQuoteComp.saveData();
    }
}