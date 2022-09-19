const getTrainee="SELECT * FROM trainee";
const getTraineeById="Select * from trainee where id=$1";
const checkEmailExists="Select t from trainee t where t.email=$1";
const addTrainee="Insert into trainee (name,email,dob) values ($1,$2,$3)";
const removeTrainee="Delete from trainee where id=$1";
const updateTrainee="Update trainee set name=$1 where id=$2";
const checkUserExists="Select a from admin a where a.userid=$1";
const checkPassword="Select * from admin Where userid=$1 and password=$2";
const getScheduleById="Select * from schedules where schedule_id=$1";
const getSchedules="SELECT * FROM schedules where batch_id = $1 and sub_batch_id = $2 and section_id=$3";
const addSchedules="Insert into schedules (schedule_name,description,batch_id,sub_batch_id,section_id) values ($1,$2,$3,$4,$5)";
const removeSchedule="Delete from schedules where schedule_id=$1";
const updateSchedules="Update schedules set schedule_name=$1,description=$2 where schedule_id=$3";
const get_events="Select event_id,event_title,start_date,end_date,instructor,additional_info from events  where schedule_id=$1";
const addEvent="insert into events (event_title,start_date,end_date,instructor,additional_info,schedule_id,event_type,link_classroom) values ($1,$2,$3,$4,$5,$6,$7,$8)";
const removeEvent="Delete from events where event_id=$1";
const updateEvent="Update events set event_title=$1,start_date=$2,end_date=$3,instructor=$4,additional_info=$5 where event_id=$6";




//==========================narendra's code===============================
const addBatch = "insert into batches (batchname,location,batchsize,startdate,batchtype) values($1,$2,$3,$4,$5)";
const getBatches = "select batch_id, batchname,location,batchsize,startdate,batchtype from batches";
const add_SubBatch = "insert into sub_batches (batch_id,sub_batch_name,stream,size,location,batch_name,start_date,end_date,batch_admin,dl_name,feedback) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
const get_SubBatches = "select sub_batch_id,sub_batch_name,stream,size,location,start_date,end_date,batch_admin,feedback from sub_batches where batch_id = $1";
const delete_subBatch = "delete from sub_batches where sub_batch_id = $1";
const delete_Batch = "delete  from batches where batch_id = $1";
const edit_SubBatch = "update sub_batches set batch_id = $1,sub_batch_name = $2,stream = $3,size = $4,location = $5,batch_name = $6,start_date = $7,end_date = $8,batch_admin = $9,dl_name = $10,feedback = $11 where sub_batch_id = $12";
const editBatch = "update batches set batchname = $1,location = $2,startdate = $3,batchsize = $4,batchtype = $5 where batch_id = $6";
const getSections  = "select * from section where batch_id = $1 and sub_batch_id = $2";
const addSections = "insert into section (section_name,classroom,strength,owner,track,dl_name,batch_id,sub_batch_id ) values ($1,$2,$3,$4,$5,$6,$7,$8)";
const editSections = "update section set section_name = $1,classroom = $2,strength = $3,owner = $4,track = $5,dl_name =$6,batch_id = $7,sub_batch_id = $8 where section_id = $9 ";
const deleteSection = "delete from section where section_id = $1";

module.exports={
    getTrainee,
    getTraineeById,
    checkEmailExists,
    addTrainee,
    removeTrainee,
    updateTrainee,
    checkUserExists,
    checkPassword,
    getSchedules,
    addSchedules,
    removeSchedule,
    updateSchedules,
    getScheduleById,
    addBatch,
    getBatches,
    add_SubBatch,
    get_SubBatches,
    delete_subBatch,
    delete_Batch,
    get_events,
    edit_SubBatch,
    editBatch,
    addEvent,
    removeEvent,
    updateEvent,
    getSections,
    addSections,
    editSections,
    deleteSection
};