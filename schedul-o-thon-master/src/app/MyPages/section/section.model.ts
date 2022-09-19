export class Sections {
    section_name:string;
    classroom_name:string;
    strength:number;
    owner :string;
    dl_name : string;

    track:string;

    constructor(section_name:string,owner:string,dl_name:string,classroom_name:string,strength:number,track:string){
        this.section_name = section_name;
        this.classroom_name = classroom_name;
        this.strength= strength;
        this.owner = owner;
        this.track = track;
        this.dl_name = dl_name;
    }


}