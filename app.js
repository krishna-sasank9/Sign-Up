const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    
    const data= {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const Jsondata= JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/c0df486547"
    const options ={
        method:"POST",
        auth: "Krishna:f8bdb58a241b977b03921f600beafb6f-us21"
    }
    const request= https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/fail.html");
        }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })
     request.write(Jsondata);
     request.end();
});

app.post("/fail.html", function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running!!");
});
