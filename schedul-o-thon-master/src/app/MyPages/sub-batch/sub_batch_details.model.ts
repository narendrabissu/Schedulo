export class Details {
    sub_batch_name : string;
    batch_name : string;
start_date : Date;
stream:string;
end_date:Date;
batch_admin:string;
feedback:string;
dl_name : string;
location:string;
size:number;

    constructor(sub_batch_name:string,stream:string,size:number,location : string,batch_name:string,start_date:Date,end_date:Date,batch_admin:string,feedback:string,dl_name:string){
 this.sub_batch_name = sub_batch_name;
this.batch_name = batch_name;
 this.start_date = start_date;
 this.end_date = end_date;
 this.batch_admin = batch_admin;
 this.feedback = feedback;
 this.dl_name = dl_name;
 this.stream = stream;
 this.location = location;
 this.size = size;

    }
}


export class Batch_Name {
    batch_name:string;

    constructor(batch_name:string) {
        this.batch_name = batch_name;
    }
}