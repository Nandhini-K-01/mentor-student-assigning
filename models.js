const mongo = require("./connect");

module.exports.createMentor = async (req,res,next) => {
    try{
        const insertResponse = await mongo.selectedDb.collection("mentors").insertOne({...req.body});
        res.send(insertResponse)
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.getMentor = async (req,res,next) => {
    try{
        const response = await mongo.selectedDb.collection("mentors").find().toArray();
        res.send(response)
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.createStudent = async (req,res,next) => {
    try{
        const insertResponse = await mongo.selectedDb.collection("students").insertOne({...req.body});
        res.send(insertResponse)
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.getStudent = async (req,res,next) => {
    try{
        const response = await mongo.selectedDb.collection("students").find().toArray();
        res.send(response)
    }catch(err){
        res.status(500).send(err);
    }
}


module.exports.assignStudent = async (req,res,next) => {
    try{
        const mentorId= req.params.id;
        // const mentorId= req.body.mentorId;
        const updatedResponse = await mongo.selectedDb.collection("mentors").findOneAndUpdate({mentorId: mentorId},
            {$set: {students: req.body.students}},
            {returnDocument: "after"},
        );
        res.send(updatedResponse);
    }catch (err){
        res.status(500).send(err);
    }
}


module.exports.changeorAssignMentor = async (req,res,next) => {
    try{
        const studentId= req.params.id;
        // const mentorId= req.body.mentorId;
        const updatedResponse = await mongo.selectedDb.collection("students").findOneAndUpdate({studentId: studentId},
            {$set: {...req.body}},
            {returnDocument: "after"},
        );
        res.send(updatedResponse);
    }catch (err){
        res.status(500).send(err);
    }
}


module.exports.getAllStudents = async (req,res,next) => {
    try{
        const studentDetails = await mongo.selectedDb.collection("mentors").aggregate([
            {
                $lookup:{
                    from: "students",
                    localField: "mentorId",
                    foreignField: "mentorId",
                    as: "Student_Details"
                }
            }
        ]).toArray()
        res.send(studentDetails);
    }catch(err){
        res.status(500).send(err);
    }
}