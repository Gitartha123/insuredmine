const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { Worker } = require("worker_threads");
const User = require("../models/User");
const Policy = require("../models/Policy");
const upload = multer({ dest: 'uploads/' });

/************************** Upload file and delegate processing to worker thread ********/
exports.uploadFile = [upload.single('file'), async (req, res) => {
    try {
        // Check if a file was uploaded and path exists
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        /*********************** Resolve the absolute file path *****/
        const filepath = path.resolve(req.file.path);

        /*********************** Create a worker thread to process the file asynchronously **/
        const worker = new Worker(path.join(__dirname, '../workers/dataUploader.js'), {
            workerData: { filepath }
        });

        /****************  Listen for successful message from worker *******/
        worker.on('message', msg => res.json(msg));

        /**************  Handle errors from worker ****************/
        worker.on('error', err => res.status(500).json({ error: err.message }));

    } catch (error) {
        console.log("error", error);
    }
}]


/************************** find policy info with the help of the username. */
exports.findPolicyByUsername = [async(req,res)=>{
    try {
        const user = await User.findOne({firstName:req.params.username});
        if(!user){
            return res.status(404).json({message:'User not found !!'});
        }

        const policy_details = await Policy.find({userId:user._id});
        if(policy_details.length == 0){
            return res.status(404).json({message:'Policy details not found !!'});
        }

        return res.status(200).json({data:policy_details});
    } catch (error) {
        return res.status(500).json({error:err.message});
    }
}]

/****************************** provide aggregated policy by each user. */
exports.aggregatedPolicyByuser = [async(req,res)=>{
    try {
        const result = await Policy.aggregate([
            {
                $group:{
                    _id:"$userId",
                    totalPolicies:{$sum:1}
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"_id",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project:{
                    _id:0,
                    username:"$user.firstName",
                    totalPolicies: 1
                }
            }
        ]);

        return res.status(200).json({data:result});
    } catch (error) {
        return res.status(500).json({error:err.message});
    }
}]