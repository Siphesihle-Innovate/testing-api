import express from 'express';
import dbConnection from '../config/db.js'
const router = express.Router();

//routes already start with users from users

//get user from database
router.get('/', (req,res)=>{
    res.send("Hello users");
})

/*save user to database
router.post('/', (req,res)=>{
    res.send("POST ROUTE REACHED")
})*/

router.post('/register', (req,res)=>{
    const Name = req.body.StaffName;
    const Surname = req.body.StaffSurname;

    if (!Name || !Surname) {
        return res.status(400).json({ error: 'Missing fields' });
    }
 
    const sql = 'INSERT INTO egUser (StaffName, StaffSurname) VALUES (?, ?)';
   
   
    dbConnection.query(sql,[Name,Surname],(err,result)=>
    {
        if (err) {
            throw err;
        };
        res.send(`${Name} ${Surname} was registered`);
    });
})

export default router;