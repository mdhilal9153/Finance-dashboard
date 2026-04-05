const record = require('../models/FinancialRecords');

const createRecord = async (req,res) => {
    try{
        const {amount, type, category, date, notes} = req.body;

        await record.create({amount, type, category, date, notes, createdBy:req.user.userId});

        res.status(200).json({message:"Record created successfully.."});
    } catch(err){
        res.status(500).json({message:err.message});
    }
}


const getRecords = async (req,res) => {
    try{
        const records = await record.find({isDeleted:false});

        res.status(200).json(records);
    } catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}


const updateRecord = async (req,res) => {
    try{

        const {id} = req.params;
        const {amount, type, category, date, notes} = req.body;

        await record.updateOne({_id:id},{amount, type, category, date, notes});

        res.status(200).json({message:"Record updated successfully.."});

    } catch(err){
        res.status(500).json({message:err.message});
    }
}



const deleteRecord = async (req,res) => {
    try{

        const {id} = req.params;

        await record.updateOne({_id:id,isDeleted:false},{isDeleted:true});

        res.status(200).json({message:"Record deleted successfully.."});

    } catch(err){
        res.status(500).json({message:err.message});
    }
}


const getRecordById = async (req,res) => {
    try{
        const {id} = req.params;

        const fetchedRecord = record.findOne({_id:id});

        res.status(200).json(fetchedRecord);
    } catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports = {createRecord,getRecords,updateRecord,deleteRecord,getRecordById};