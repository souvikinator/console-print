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
            Black: '\u001b[30m',
            Red: '\u001b[31m',
            Green: '\u001b[32m',
            Yellow: '\u001b[33m',
            Blue: '\u001b[34m',
            Magenta: '\u001b[35m',
            Cyan: '\u001b[36m',
            White: '\u001b[37m',
        },
        backgrounds:{
            Black: '\u001b[40m',
            Red: '\u001b[41m',
            Green: '\u001b[42m',
            Yellow: '\u001b[43m',
            Blue: '\u001b[44m',
            Magenta: '\u001b[45m',
            Cyan: '\u001b[46m',
            White: '\u001b[47m',
        },
        bold:'\u001b[1m',
        underline:'\u001b[4m',
        reverse:'\u001b[7m',
        reset:'\u001b[0m'
    }
}

init.prototype.debug=function(print='',options){
    options=Object.assign({
        style:{color:'',background:'',underline:false,bold:false,reverse:false},
        table:false,
        group:'',
        count:false
    },options);
    this.style=options.style||'';
    this.table=options.table||false;
    this.group=options.group||'';
    this.output=print;
    
    if(options.group.length>0){
        this.is_grouped=true;
    }else{
        this.is_grouped=false;
    }

    if(this.style_props.colors.hasOwnProperty(options.style.color)){
        this.output=this.style_props.colors[options.style.color]+this.output;
    }if(this.style_props.backgrounds.hasOwnProperty(options.style.background)){
        this.output=this.style_props.backgrounds[options.style.background]+this.output;
    }if(options.style.bold){
        this.output=this.style_props.bold+this.output;
    }if(options.style.underline){
        this.output=this.style_props.underline+this.output;
    }if(options.style.reverse){
        this.output=this.style_props.reverse+this.output;
    }

    
    if(options['group'].length>0){
        if(!this.groups.hasOwnProperty(options.group)){
            this.groups[options.group]=[];
        }
            this.groups[options.group].push({log:this.output});
    }
    this.output+=this.style_props.reset;
    if(!this.is_grouped){
        console.log(this.output);
    }

}

init.prototype.callGrp=function(name){
    if(this.groups.hasOwnProperty(name)){
        console.log(`\u001b[40;1m\u001b[33;1m group:\u001b[36m${name} \u001b[0m`);
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

/*test code*/
var d=new init();
d.debug('hello',{
    style:{
        color:'Cyan',
        underline:true,
        bold:true
    },group:'grp-1',
});
d.debug({'hello':'hi'},{
    style:{
        color:'Yellow',
        background:'Black',
        bold:true
    },group:'grp-1'
});
d.callGrp('grp-1');