const mongoose = require("mongoose");
exports.initialize = function(app){
    const Diary = mongoose.model('Diary');

    app.get("/compose",function(req,res){
        res.render("compose");
    });
    
    app.post("/compose",function(req,res){
        const obj=new Diary({
            title : req.body.title,
            entry : req.body.post
        });
        obj.save();
        res.redirect("/");
    });

    app.get("/",function(req,res){
        Diary.find(function(err,posts){
            if(err){
            console.log(err);
            }else{
            const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
            res.render("home",{home_text:homeStartingContent,Posts:posts});
            }
        });
    });
      
    //route parameters for custom routes
    app.get("/post/:id",function(req,res){
        const postId = req.params.id;
        Diary.findOne({_id : postId},function(err,post){
            res.render("post",{Element:post});
        });
    });
    
    const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
    app.get("/about",function(req,res){
      res.render("about",{about_text:aboutContent});
    });

    const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
    app.get("/contact",function(req,res){
        res.render("contact",{contact_text:contactContent});
    });
};