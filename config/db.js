import mysql from 'mysql2';

const connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: 'Siphesihle@mysql04',
    database: 'ProjectDB'
  });

  //try to connect and check if connected
  connection.connect((err) => {
    if (err) {throw err;}
    else{console.log('Connected to MySQL Database!!');}
    
    
    // Close the connection

  });

  export default connection;