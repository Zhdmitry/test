import {Screenshot} from "./screenshot";
export  class DesignSlide{
    constructor(public  id:number,
                public title:string,
                public  description:string,
                public order:number,
                public screenshotsLabel:string,
                public visible:boolean,
                public screenshots:Screenshot[]){}

}