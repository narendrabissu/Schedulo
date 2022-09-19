
export class Batch_Details {
    batchname:string;
    location:string;
    batchsize:number;
    startdate:Date;
    batchtype:string;

    constructor(batchname:string,location:string,batchsize:number,startdate:Date,batchtype:string){
        this.batchname = batchname;
        this.location = location;
        this.batchsize = batchsize;
        this.startdate = startdate;
        this.batchtype = batchtype;
    }


}
