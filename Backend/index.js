const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connection = require('./utils/db');
const app = express();
const port = 3000;
const userRoute = require('./routes/user.route');
const companyRoute = require('./routes/company.route');
const jobRoute = require('./routes/job.route');
const applicationRoute = require('./routes/application.route');
const path = require('path');

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// All API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


app.use(express.static(path.join(_dirname,"/frontend/dist" )));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        connection(); // Ensure MongoDB is connected
        console.log(`Server is running on port ${port}`);
    }
});



