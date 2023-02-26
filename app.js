const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    const email  = req.body.emal;
    const firstName = req.body.lastNa;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/66d7616718";

    const option = {
        method: "POST",
        auth: "adnansaif98:b2cb1339af189956f3ab4fc6e83dda43-us21"
    };

    const request =  https.request(url, option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } 
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Listening to port 3000.");
});



// b2cb1339af189956f3ab4fc6e83dda43-us21
// list id
// 66d7616718