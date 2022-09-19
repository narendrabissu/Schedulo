export class Event{
    event_id:number;
    event_title:string;
    start_date:Date;
    end_date:Date;
    instructor:string;
    additional_info:string;
    schedule_id:number;
    

    constructor(event_id:number,event_title:string,start_date:Date,end_date:Date,instructor:string,additional_info:string,schedule_id:number){
            this.event_id=event_id;
            this.event_title=event_title;
            this.start_date=start_date;
            this.end_date=end_date;
            this.instructor=instructor;
            this.additional_info=additional_info;
            this.schedule_id=schedule_id;
        }



}

