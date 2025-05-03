import express from 'express';
import dbConnection from '../config/db.js';
const router = express.Router();

router.post('/register',async (req,res)=>{
    //capture the admin ID/facility id as well
    const {
       ResidentName,
       ResidentSurname,
       Email,
       PhoneNumber,
       ResidentPassword
     } = req.body;

   // res.send(`name: ${ResidentName}, surname: ${ResidentSurname}, email: ${Email}`);
     const sqlresident = 'INSERT INTO Resident (ResidentName,ResidentSurname,Email,PhoneNumber,ResidentPassword) VALUES (?,?,?,?,?)';

     dbConnection.query(sqlresident,[ResidentName,ResidentSurname,Email, PhoneNumber, ResidentPassword],(err,results)=>{
          if(err){
           res.send("Could not register the staff member");
          }
          else{
            res.send(`name: ${ResidentName}, surname: ${ResidentSurname}, email: ${Email}`);
          }
     })
    
});

router.post('/login',async (req,res)=>{
    //capture the admin ID/facility id as well

     //const adminEmail = req.headers['x-admin-email'];
     const Email = req.body.email;
     const password = req.body.password;
       
    // res.send(Email + password)
     //check if the user is the admin
      const _dbResultAdmin = await dbConnection.execute(
       `SELECT AdminID FROM Administrator WHERE Email = ? AND AdminPassword = ?`,
       [Email, password]
      );
     
    

     if(_dbResultAdmin.length>0){
        
        const adminResult = _dbResultAdmin[0];
        
        const name = adminResult[0].AdminName;
        res.send(`Admin with name: ${name}`);
      }
        
     //check if the user is the staff 
      const _dbStaffresult = await dbConnection.execute(
        `SELECT StaffID FROM Staff WHERE Email = ? AND StaffPassword = ?`,
       [Email, password]
      );
       
      const dfd = 22;

       if(_dbStaffresult.length>0){
        const Staffresult = _dbStaffresult[0];
        const name = Staffresult[0].StaffName;
        res.send(`The staff named: ${name} is logged in`)
       }
     //check if the user is the resident
     const _dbResidentresult = await dbConnection.execute(
        `SELECT ResidentName FROM Resident WHERE Email = ? AND ResidentPassword = ?`,
       [Email, Password]
      );
      res.send(_dbResidentresult);
      const reso = _dbResidentresult[0];
      const id = reso[0].ResidentName;
      res.send(id);
      if(_dbResidentresult){
        const residentresult = _dbResidentresult[0];
       const name = residentresult[0].ResidentName;
       res.send(`The resident named: ${name} is logged in`)
      }
      else{
        res.send("Nothing on residents")
      }
 


    //  const Staffresult = await dbConnection.execute(
    //     `SELECT StaffID FROM Staff WHERE Email = ? AND AdminPassword = ?`,
    //    [Email, password]
    //   );

    //   const residentresult = await dbConnection.execute(
    //     `SELECT FacilityID FROM Administrator WHERE Email = AND AdminPassword = ?`,
    //    [Email, password]
    //   );

       res.send('Query failed');

      //const facilityID = admin[0].FacilityID;
      const sqlstaff = 'INSERT INTO Staff (FacilityID,StaffName,StaffSurname,Id,Role,Email,Phone,StaffPassword) VALUES (?,?,?,?,?,?,?,?)';

        dbConnection.query(sqlstaff,[facilityID,StaffName,StaffSurname,Id,Role,Email,Phone,StaffPassword],(err,results)=>{
            if(err){
            res.send("Could not register the staff member");
            }
            else{
            res.send("The systemthe staff member");
            }
        })
    
})

export default router;