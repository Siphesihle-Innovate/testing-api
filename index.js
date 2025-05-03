import express from  'express';
import bodyParser from 'body-parser'; //allows us to take in incoming POST request bodies
//temporarily import the database file
import dbConnection from './config/db.js';

//import routes
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.routes.js';
import residentRoutes from './routes/resident.route.js';
import staffRoutes from './routes/staff.routes.js';
import authRoutes from './routes/auth.routes.js'; //routes for authorizing

const app = express();
const _PORT = 5000;

//initialize the body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/********************************************** */
/********************************************** */

app.use('/users', userRoutes);
app.use('/resident', residentRoutes);
app.use('/staff', staffRoutes);
app.use('/admin', adminRoutes);

//register a new resident
app.use('/auth', authRoutes);
app.use('/auth',authRoutes);


app.get('/', (req,res) =>{
    res.send('hello world');
});

//listen for incoming request
app.listen(_PORT, () =>
    console.log(`Server running on port: http://localhost:${_PORT}`)
);
