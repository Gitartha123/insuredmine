const { workerData, parentPort } = require('worker_threads');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
require('dotenv').config();

const Agent = require('../models/Agent');
const User = require('../models/User');
const Account = require('../models/Account');
const LOB = require('../models/LOB');
const Carrier = require('../models/Carrier');
const Policy = require('../models/Policy');

mongoose.connect(process.env.MONGO_URI);

/***** Worker thread function that receives filepath from workerData,reads Excel/CSV file, and stores data into MongoDB collections.**/
(async () => {
    try {
        console.log('Received workerData:', workerData);
        const filePath = workerData.filepath;

        if (!filePath) {
            throw new Error('File path is undefined');
        }

        /***************  Read CSV or XLSX *****************/
        const wb = xlsx.readFile(filePath, { type: 'file' }); 
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(ws);

        /******************* Inserting data to the collections */
        for (let row of data) {
            const agent = await Agent.create({ agent: row['agent'] });
            const user = await User.create({
                firstName: row['firstname'],
                dob: row['dob'],
                address: row['address'],
                phoneNumber: row['phone'],
                state: row['state'],
                zipCode: row['zip'],
                email: row['email'],
                gender: row['gender'],
                userType: row['userType'],
            });
            const account = await Account.create({ accountName: row['account_name'] });
            const lob = await LOB.create({ categoryName: row['category_name'] });
            const carrier = await Carrier.create({ companyName: row['company_name'] });

            await Policy.create({
                policyNumber: row['policy_number'],
                policyStartDate: row['policy_start_date'],
                policyEndDate: row['policy_end_date'],
                policyCategoryId: lob._id,
                companyId: carrier._id,
                userId: user._id
            });
        }

        parentPort.postMessage({ status: 'Success', message: 'Data uploaded' });
    } catch (err) {
        parentPort.postMessage({ status: 'Failed', error: err.message });
    }
})();
