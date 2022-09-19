export class Schedule{
    schedule_id:number;
      schedule_name:String;
      description:String;
      batch:String;
      sub_batch:String;
      section:String;

      constructor( schedule_id:number,schedule_name:String,description:String,batch:String,sub_batch:String,section:String){
          this.schedule_id=schedule_id;
          this.schedule_name=schedule_name;
          this.description=description;
          this.batch=batch;
          this.sub_batch=sub_batch;
          this.section=section;
      }
}