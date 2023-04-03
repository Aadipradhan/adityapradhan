public with sharing class QuoteDto extends BaseDto {
    public Date endDate;
    
    public QuoteDto() {
    }
    
    public QuoteDto(Quote__c quote) {
        super(quote);
        this.endDate = quote.EndDate__c;
    }
    
    public override SObject refreshSo() {
        return null;
    }
    
    //This method is used to  update the Quote__c record
    @AuraEnabled
    public static void updateQuote(quoteWrapper quoteData){
        Quote__c quoteObj = new Quote__c();
        quoteObj.Id = quoteData.Id;
        if(quoteData.startDate != null)
            quoteObj.StartDate__c = quoteData.startDate;
        if(quoteData.endDate != null)
            quoteObj.EndDate__c = quoteData.endDate;
        if(quoteData.totalAmount != null)
            quoteObj.TotalQuotedAmount__c = quoteData.totalAmount;
        Database.update(quoteObj);
    }
    
    //This method is used to query the Quote__c record and return it to JS.
    @AuraEnabled(cacheable = true)
    public static quoteWrapper getQuotebyRecId (String recordId){
        Quote__c quoteObj = [SELECT Id,Name,StartDate__c,EndDate__c,TotalQuotedAmount__c  FROM Quote__c where Id= :recordId];
        quoteWrapper quoteWrapperObj = new quoteWrapper();
        quoteWrapperObj.Id = quoteObj.Id;
        quoteWrapperObj.name = quoteObj.Name;
        quoteWrapperObj.startDate = quoteObj.StartDate__c;
        quoteWrapperObj.endDate = quoteObj.EndDate__c;
        quoteWrapperObj.totalAmount = quoteObj.TotalQuotedAmount__c;
        return quoteWrapperObj ;
    }
    
    //Wrapper class is created
    public class quoteWrapper{
        @AuraEnabled public String Id{get; set;}
        @AuraEnabled public String name{get; set;}
        @AuraEnabled public Date startDate{get; set;}
        @AuraEnabled public Date endDate{get; set;}
        @AuraEnabled public Decimal totalAmount{get; set;}
    }
}
