const { parse } = require('querystring');
const express=require('express')
const jwt=require('jsonwebtoken');
const app=express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//const User=require('D:/educational/schedulo/scheduloApp/src/app/user.js');
const pool=require('../../database');
const queries=require("./queries")
const getTrainee=(req,res)=>{
    pool.query(queries.getTrainee,(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}
const getTraineeById=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getTraineeById,[id],(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}

const addTrainee=(req,res)=> {
    const {name,email,dob}=req.body;

    pool.query(queries.checkEmailExists,[email],(error,result)=>{
        if(result.rowCount){
            res.send("Account already exists with given email");
        }
        //add trainee to db
        pool.query(queries.addTrainee,[name,email,dob],(error,result)=>{
            if(error) throw error;
            res.status(201).send("Trainee added sucessfully!");
            console.log("Trainee created!")
        })
    })
}
const removeTrainee=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getTraineeById,[id],(error,result)=>{
        const noTraineeFound=!result.rows.length;
        if(noTraineeFound){
            res.send("Trainee does not exists! Cant delete!");
        }
        pool.query(queries.removeTrainee,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send("Trainee removed suceesfully! ")
        })
    })
}
const updateTrainee=(req,res)=>{
    const id=parseInt(req.params.id);
    const {name}=req.body;
    pool.query(queries.getTraineeById,[id],(error,result)=>{
        const noTraineeFound=!result.rows.length;
        if(noTraineeFound){
            res.send("Trainee does not exists!");
        }
        pool.query(queries.updateTrainee,[name,id],(error,result)=>{
            if(error) throw error;
            res.status(200).send("Trainee updated suceesfully! ")

        })
    })


}
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        res.status(401).send("unauthorized request")

    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        res.status(401).send("unauthorized request")
    }
    let payload=jwt.verify(token, 'secretKey')
    if(!payload) res.status(401).send("unauthorized request")
    req.userId=payload.subject
    next()
}

const login=(req,res)=>{
    const {userid,password}=req.body;
    let role;
    //const password=parse(req.params.password);
    pool.query(queries.checkUserExists,[userid],(error,result)=>{
        const noUserExists=!result.rows.length;
        if(noUserExists){
            return res.status(401).send({msg:"Inavild userid"})
        }
        pool.query(queries.checkPassword,[userid,password],(error,result)=>{
            if(result.rowCount==0){
                return res.status(401).send({msg:"invalid Password"})
            }
            else{
                let payload={ subject: [userid]}
                let token=jwt.sign(payload,'secretKey')
                //console.log(result.rows[0].role);
                role=result.rows[0].role;
                return res.status(200).send({"token":token,"role":role});
                
            }
        })

    })
}

 const getScheduleById=(req,res)=>{
     const schedule_id=parseInt(req.params.schedule_id);
     pool.query(queries.getScheduleById,[schedule_id],(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}
// const getSchedules=(req,res)=>{
//     pool.query(queries.getSchedules,(error,result)=>{
//         if(error) throw error;
//         res.status(200).json(result.rows);
//     });
     
// }




const getSchedules= (req,res) => {
    const batch_id = req.params.batch_id;
    const sub_batch_id = req.params.sub_batch_id;
    const section_id=req.params.section_id;
    console.log(batch_id,sub_batch_id,section_id);
    pool.query(queries.getSchedules,[batch_id,sub_batch_id,section_id],(error,results)=>{
      if (error) throw error
      res.status(200).json(results.rows);
    });
  }
const addSchedules=(req,res)=>{
    const {schedule_name,description,batch_id,sub_batch_id,section_id}=req.body;
    
        pool.query(queries.addSchedules,[schedule_name,description,batch_id,sub_batch_id,section_id],(error,result)=>{
            if(error) throw error;
            return res.json({"msg":"schedule added sucessfully!"});
        })
        
}

const removeSchedule=(req,res)=>{
    const schedule_id=parseInt(req.params.schedule_id);
    console.log(schedule_id);
        pool.query(queries.removeSchedule,[schedule_id],(error,result)=>{
            if(error) throw error;
            return res.json({"msg":"Schedule removed suceesfully! "})
        })
    
}

const updateSchedule=(req,res)=>{
    const schedule_id=req.params.schedule_id;
    console.log(schedule_id);
    const {schedule_name,description}=req.body;
    //console.log(req.body[0]);
    pool.query(queries.updateSchedules,[schedule_name,description,schedule_id],(error,result)=>{
        if(error) throw error;
        return res.json({"msg":"updated sucessfully"})
    }
    )
}

const get_events = (req,res) =>{
   
    const schedule_id = req.params.schedule_id;
  
    pool.query(queries.get_events,[schedule_id],(error,results)=>{
      if (error) throw error
  
      res.status(200).json(results.rows);
    });
   }

   const addEvents=(req,res)=>{
    const {event_title,start_date,end_date,instructor,additional_info,schedule_id,event_type,classroom_link}=req.body;
    console.log(schedule_id);
        //add="insert into events (event_title,start_date,end_date,instructor,additional_info,schedule_id) values ($1,$2,$3,$4,$5,$6)";
        pool.query(queries.addEvent,[event_title,start_date,end_date,instructor,additional_info,schedule_id,event_type,classroom_link],(error,result)=>{
            if(error) throw error;
            res.json({"msg":"event added sucessfully!"});
            
        })
        
}

const removeEvent=(req,res)=>{
    const event_id=parseInt(req.params.event_id);
    console.log(event_id);
        pool.query(queries.removeEvent,[event_id],(error,result)=>{
            if(error) throw error;
            return res.json({"msg":"Schedule removed suceesfully! "})
        })
    
}

const updateEvent=(req,res)=>{
    const event_id=req.params.event_id;
    console.log(event_id);
    const {event_title,start_date,end_date,instructor,additional_info}=req.body;
    //console.log(req.body[0]);
    pool.query(queries.updateEvent,[event_title,start_date,end_date,instructor,additional_info,event_id],(error,result)=>{
        if(error) throw error;
        return res.json({"msg":"updated sucessfully"})
    }
    )
}






//======================================narendra's Code=======================================================
const addBatch = (req,res) =>{

    const {batchname,location,batchsize,startdate,batchtype} = req.body;
   
    pool.query(queries.addBatch,[batchname,location,batchsize,startdate,batchtype],(error,result)=>{
     if (error) throw error
      return res.json({"msg":"batch  successfully added"});
    })
   }
   
   
   const add_SubBatch = (req,res) =>{
   
     const {sub_batch_name, batch_id, stream,size,location,batch_name,start_date,end_date,batch_admin,dl_name,feedback} = req.body;
    
     pool.query(queries.add_SubBatch,[batch_id,sub_batch_name,stream,size,location,batch_name,start_date,end_date,batch_admin,dl_name,feedback],(error,result)=>{
      if (error) throw error
       return res.json({"msg":"sub batch  successfully added"});
     })
    }
   
   
    const get_SubBatches = (req,res) =>{
   
     const batch_id = req.params.batch_id;
   
     pool.query(queries.get_SubBatches,[batch_id],(error,results)=>{
       if (error) throw error
   
       res.status(200).json(results.rows);
     });
    }
   
    const delete_subBatch = (req,res) =>{
      const sub_batch_id = req.params.sub_batch_id;
   
      pool.query(queries.delete_subBatch,[sub_batch_id],(error,results) =>{
        if (error) throw error
        res.status(200).json({"msg":"deleted!!"});
      })
    }
   
    const delete_Batch = (req,res) =>{
     const batch_id = req.params.batch_id;
   
     pool.query(queries.delete_Batch,[batch_id],(error,results) =>{
       if (error) throw error
       res.status(200).json({"msg":"deleted!!"});
     })
   }
    
   const getBatches = (req,res) => {
       console.log("called");
   
     pool.query(queries.getBatches,( error , results)=>{
       if (error) throw error
       console.log(results.rows);
        res.status(200).json(results.rows);
     });
   
    }

    const edit_SubBatch = (req,res) =>{
        const sub_batch_id = req.params.sub_batch_id;
      
         const {sub_batch_name, batch_id, stream,size,location,batch_name,start_date,end_date,batch_admin,dl_name,feedback} = req.body;
         pool.query(queries.edit_SubBatch,[batch_id,sub_batch_name,stream,size,location,batch_name,start_date,end_date,batch_admin,dl_name,feedback,sub_batch_id],(error,result) =>{
           if (error) throw error
           return res.json({"msg":"data updated successfully"});
         })
       }
      
      
      
       const editBatch = (req,res) =>{
         const batch_id = req.params.batch_id;
         const {batchname,location,startdate,batchsize,batchtype} =req.body;
         pool.query(queries.editBatch,[batchname,location,startdate,batchsize,batchtype,batch_id],(error,result) =>{
           if (error) throw error 
           return res.json({"msg":"batch updated successfully"});
         })
       }

       const addSections = (req,res) => {
        const {section_name,classroom,strength,owner,track,dl_name,batch_id,sub_batch_id} = req.body;
     
        pool.query(queries.addSections,[section_name,classroom,strength,owner,track,dl_name,batch_id,sub_batch_id],(error,result)=>{
          if (error) throw error
          return res.json({"msg" : "section added successfully"});
        })
     
     
      }
      const editSections = (req,res) => {
        const section_id = req.params.section_id;
        const {section_name,classroom,strength,owner,track,dl_name,batch_id,sub_batch_id} = req.body;
        pool.query(queries.editSections,[section_name,classroom,strength,owner,track,dl_name,batch_id,sub_batch_id,section_id],(error,result)=>{
          if (error) throw error
          return res.json({"msg":"section updated successfully"});
        })
      }

      const getSections = (req,res) => {
        const batch_id = req.params.batch_id;
        const sub_batch_id = req.params.sub_batch_id;
        console.log(batch_id,sub_batch_id);
        pool.query(queries.getSections,[batch_id,sub_batch_id],(error,results)=>{
          if (error) throw error
     
          res.status(200).json(results.rows);
        });
      }

      const deleteSection = (req,res) =>{
        const section_id = req.params.section_id;
        pool.query(queries.deleteSection,[section_id],(error,results) =>{
          if (error) throw error
          res.status(200).json({"msg":"deleted!!"});
         
        })
      }





module.exports={
    getTrainee,
    getTraineeById,
    addTrainee,
    removeTrainee,
    updateTrainee,
    login,
    getSchedules,
    addSchedules,
    removeSchedule,
    updateSchedule,
    getScheduleById,
    getBatches,
    addBatch, 
    add_SubBatch,
    get_SubBatches,
    delete_subBatch,
    delete_Batch,
    get_events, 
    editBatch,
    edit_SubBatch,
    addEvents,
    removeEvent,
    updateEvent,
    addSections,
    editSections,
    getSections,
    deleteSection


};