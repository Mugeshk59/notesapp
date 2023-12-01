const chalk = require("chalk");
const notes = require("./notes.js");
const yargs=require("yargs");

yargs.version("1.1.0")

//create add command
yargs.command({
        command:'add',
        describe:'Add a new Note',
        builder:{
                title:{
                        describe:'Note Title',
                        demandOption:true,
                        type:'string'
                },
                body:{
                        describe:'Note Body',
                        demandOption:true,type:'string'
                }
        },
        handler:(argv)=>notes.addNote(argv.title,argv.body)
});

//create remove command
yargs.command({
        command:'remove',
        describe:'remove a Note',
        builder:{
                title:{
                        describe:'Title of note to be removed',
                        demandOption:true,
                        type:'string'
                }
        },
        handler:(argv)=> notes.removeNote(argv.title)
});

//create List command
yargs.command({
        command:'list',
        describe:'Listing Note',
        handler:()=>{
                console.log(chalk.green.bold("Listing Your Notes"));
                const noteTitles = notes.listNotes()
                // console.log(noteTitles);
                noteTitles.forEach((elemnt,index) => {
                      console.log(chalk.blue.bold(index+1+` . ${elemnt}`));  
                });
                
        }
});

//create read command
yargs.command({
        command:'read',
        describe:'read a Note',
        builder:{
                title:{
                        describe:'Title of a note needed!',
                        demandOption:true,
                        type:'string'
                }
        },
        handler:(argv)=>{
                console.log("Reading Note!");
                const note= notes.readNote(argv.title)
               console.log(note.length==0?'No Note available with given Title!':note);
        }
});
yargs.parse()
// console.log(yargs.argv)