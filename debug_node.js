/*
* * a super simple and lame node module 
* * brings support of text styling and various
* * debugging features to node
// TODO: print
// TODO:style
TODO:table
TODO: Add support when objects are passed no styles can be applied to it.
// TODO:group
TODO:count
TODO:time
*/

var init=function(){
    this.groups={};
    this.style_props={
        colors:{
            black: '\u001b[30m',
            red: '\u001b[31m',
            green: '\u001b[32m',
            yellow: '\u001b[33m',
            blue: '\u001b[34m',
            magenta: '\u001b[35m',
            cyan: '\u001b[36m',
            white: '\u001b[37m',
        },
        backgrounds:{
            black: '\u001b[40m',
            red: '\u001b[41m',
            green: '\u001b[42m',
            yellow: '\u001b[43m',
            blue: '\u001b[44m',
            magenta: '\u001b[45m',
            cyan: '\u001b[46m',
            white: '\u001b[47m',
        },
        bold:'\u001b[1m',
        underline:'\u001b[4m',
        reverse:'\u001b[7m',
        reset:'\u001b[0m'
    }
}

init.prototype.print=function(print='',options){
    options=Object.assign({
        color:'',
        background:'',
        underline:false,
        bold:false,
        reverse:false,
        table:false,
        group:'',
        count:false
    },options);
    this.color=options.color||'';
    this.background=options.background,
    this.underline=options.underline,
    this.bold=options.bold,
    this.reverse=options.reverse,
    this.table=options.table||false;
    this.group=options.group||'';
    this.output=print;
    
    if(options.group.length>0){
        this.is_grouped=true;
    }else{
        this.is_grouped=false;
    }

    if(this.style_props.colors.hasOwnProperty(options.color.toLowerCase())){
        this.output=this.style_props.colors[options.color.toLowerCase()]+this.output;
    }if(this.style_props.backgrounds.hasOwnProperty(options.background.toLowerCase())){
        this.output=this.style_props.backgrounds[options.background.toLowerCase()]+this.output;
    }if(options.bold){
        this.output=this.style_props.bold+this.output;
    }if(options.underline){
        this.output=this.style_props.underline+this.output;
    }if(options.reverse){
        this.output=this.style_props.reverse+this.output;
    }

    
    if(options['group'].length>0){
        if(!this.groups.hasOwnProperty(options.group)){
            this.groups[options.group]=[];
        }
            this.groups[options.group].push({log:this.output});
    }
    this.output+=this.style_props.reset;
    //check if grouped or not
    if(!this.is_grouped){
            console.log(this.output);
    }
}

init.prototype.callGrp=function(name){
    if(this.groups.hasOwnProperty(name)){
        console.log(`\u001b[33m ${name} :\u001b[0m`);
        this.groups[name].map(e=>{
            if(e.hasOwnProperty('log')){
                console.log(`\t${e.log}\u001b[0m`)
            }if(e.hasOwnProperty('table')){
                //call function to create table
            }
        });

    }else{
        console.error(`the group name >${name}< does not exits`);
    }
}

init.prototype.count=function(print=''){
    if(print.length>0){
        console.count(print);
    }else{
        throw('ERR: count function requires an argument')
    }
}

init.prototype.countReset=function(print=''){
    if(print.length>0){
        console.countReset(print);
    }else{
        throw('ERR: countReset function requires an argument')
    }
}

init.prototype.timerOn=(label='')=>{
    if(label.length>0){
        console.time(label);
    }else{
        throw(`invalid lable passed as argument ${label}`);
    }
}

init.prototype.timerOff=(lable='')=>{
    if(label.length>0){
        console.timeEnd(label);
    }else{
        throw(`invalid lable passed as argument ${label}`);
    }
}



