const {Router}=require('express');
const controller=require('./controller');

const router=Router();
router.get("/:id",controller.getTraineeById);
router.post("/login",controller.login);
//router.get("/getSchedules",controller.getSchedules);
router.post("/add_schedule",controller.addSchedules);
router.delete("/delete_schedule/:schedule_id",controller.removeSchedule);
router.get("/getSchedules/:batch_id/:sub_batch_id/:section_id",controller.getSchedules);
router.put("/update_schedule/:schedule_id",controller.updateSchedule);
router.get("/getScheduleById/:schedule_id",controller.getScheduleById);
router.get("/getEvents/:schedule_id",controller.get_events);
router.post("/addEvents",controller.addEvents);
router.delete("/removeEvent/:event_id",controller.removeEvent);
router.put("/update_event/:event_id",controller.updateEvent);
//======================narendra's code========================
router.post("/addBatch",controller.addBatch);
router.post("/add_SubBatch",controller.add_SubBatch);
router.get("/get_SubBatches/:batch_id",controller.get_SubBatches);
router.get("/delete_Batch/:batch_id",controller.delete_Batch);
router.get("/delete_subBatch/:sub_batch_id",controller.delete_subBatch);
router.get("/batches/get",controller.getBatches);
router.put("/edit_SubBatch/:sub_batch_id",controller.edit_SubBatch);
router.put("/editBatch/:batch_id",controller.editBatch);
router.get("/getSections/:batch_id/:sub_batch_id",controller.getSections);
router.post("/addSections",controller.addSections);
router.put("/editSections/:section_id",controller.editSections);
router.get("/deleteSection/:section_id",controller.deleteSection);


module.exports=router;