import express from 'express';
import dbConnection from '../config/db.js';

const router = express.Router();

/*save user to database
router.post('/', (req,res)=>{
    res.send("POST ROUTE REACHED")
})*/

// router.post('/register', (req,res)=>{
//     const Name = req.body.StaffName;
//     const Surname = req.body.StaffSurname;

//     if (!Name || !Surname) {
//         return res.status(400).json({ error: 'Missing fields' });
//     }
 
//     const sql = 'INSERT INTO egUser (StaffName, StaffSurname) VALUES (?, ?)';
   
   
//     dbConnection.query(sql,[Name,Surname],(err,result)=>
//     {
//         if (err) {
//             throw err;
//         };
//         res.send(`${Name} ${Surname} was registered`);
//     });
// })


router.post('/registerFacility', (req,res)=>{

    //facility data
    const Fname = req.body.F_name;
    const Fcity =  req.body.F_city;
    const FProvince = req.body.F_province;
    const FPostalCode = req.body.F_postalCode;
    const FAddress = req.body.F_address;
    const FContactNumber = req.body.F_contactNumber;
    const FEmail = req.body.F_email;
    const FFacilityLogo = req.body.F_logo;
    
    //admin data
   const AdminName = req.body.AdminName;
   const AdminSurname = req.body.AdminSurname;
   const AdminContactNumber = req.body.AdminContactNumber;
   const adminEmail = req.body.adminEmail;
   const AdminPassword = req.body.AdminPassword;
    


    // if (!Name || !Surname) {
    //     return res.status(400).json({ error: 'Missing fields' });
    // }
 
    const sqlFacility = 'INSERT INTO Facility (FacilityName, City, Province, PostalCode, Address, ContactNumber, Email, FacilityLogo) VALUES (?, ?,?, ?,?, ?,?, ?)';

   
   
    dbConnection.query(sqlFacility,[Fname,Fcity, FProvince, FPostalCode, FAddress, FContactNumber, FEmail, FFacilityLogo], (err,facilityresult)=>
    {
        if (err) {
            throw err;
        };
       

        const facilityID = facilityresult.insertId; //get the facility ID to create the admin
     
        
        //now create the admin
        const sqlAdmin = 'INSERT INTO Administrator (FacilityID, AdminName, AdminSurname, ContactNumber, Email, AdminPassword) VALUES (?, ?,?, ?,?,?)';
        
        dbConnection.query(sqlAdmin, [facilityID, AdminName, AdminSurname,AdminContactNumber,adminEmail, AdminPassword], (err,result)=>{
            if (err) {
                throw err;
            };
            res.send(`${AdminName} is registered under The ${Fname} facility `);
        })

    });
})

router.post('/register-staff',async (req,res)=>{
     //capture the admin ID/facility id as well
     const {
        FacilityID,
        StaffName,
        StaffSurname,
        Id,
        Role,
        Email,
        Phone,
        StaffPassword
      } = req.body;

      const adminEmail = req.headers['x-admin-email'];
        
      
      const result = await dbConnection.execute(
        `SELECT FacilityID FROM Administrator WHERE Email = ?`,
        [adminEmail]
      );
     

        const admin = result[0];
        
       const facilityID = admin[0].FacilityID;

       const sqlstaff = 'INSERT INTO Staff (FacilityID,StaffName,StaffSurname,Id,Role,Email,Phone,StaffPassword) VALUES (?,?,?,?,?,?,?,?)';

      dbConnection.query(sqlstaff,[facilityID,StaffName,StaffSurname,Id,Role,Email,Phone,StaffPassword],(err,results)=>{
           if(err){
            res.send("Could not register the staff member");
           }
           else{
            res.send("The system registered the staff member");
           }
      })
     
})

export default router;