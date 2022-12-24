export function inputValidator(tag:string, value:string, pattern:RegExp):boolean{
    let status = true;

    if(value.replace(" ","").search(pattern) == -1){
        status =  false;
    }else{
        status = true;
    }
    console.log("ss..",status,tag,value)
    return status;
}
