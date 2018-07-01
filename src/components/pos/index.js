const frappe = require("frappejs")
var formidable = require("formidable")
var fs = require('fs');

function posRegister(){
    frappe.registerFileMethod({
        method:'file_transfer',
        handler: args => fileSaver(args)
    });
}

function fileSaver(req){
    //console.log(Object.keys(req.params));
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = "../accounting/images/"+files.filetoupload.name;
      //console.log(Object.keys(files));
      fs.rename(oldpath, newpath, function(err){
        if (err) throw err;
      });
    });
    return "File Upload Successfulls";
    //console.log(Object.keys(req.params));
}

module.exports = posRegister