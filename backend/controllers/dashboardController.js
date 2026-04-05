const records = require("../models/FinancialRecords");

getSummary = async (req,res) => {
    try{
        const result = await records.aggregate([
            { $match: { isDeleted: false } },  // step 1: ignore deleted records
            { $group: {
            _id: "$type",                   // step 2: group by type (income/expense)
            total: { $sum: "$amount" }      // compute sum of amount per group
            }}
        ])

        const totalIncome = result.find(r => r._id === 'income')?.total || 0;
        const totalExpenses = result.find(r => r._id === 'expense')?.total || 0;
        const netBalance = totalIncome - totalExpenses;

        res.status(200).json({ totalIncome, totalExpenses, netBalance });


    } catch(err){
        res.status(500).json({message:err.message});
    } 
}

const getCategories = async (req,res) => {
    try{

        const result = await records.aggregate([
            { $match: { isDeleted: false } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
        ]);

        res.status(200).json(result);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


const getTrends = async (req,res) => {
    try{

        const result = await records.aggregate([
            { $match: { isDeleted: false } },
            { $group: {
                _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                totalIncome: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
                totalExpenses: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
            }},
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ])

        res.status(200).json(result);

    } catch(err) {
        res.status(500).json({message:err.message});
    }
}

const getRecent = async (req,res) => {
    try{

        const result = await records.find({ isDeleted: false })
        .sort({ date: -1 })
        .limit(5);

        res.status(200).json(result);

    } catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = {getSummary, getCategories, getTrends, getRecent};