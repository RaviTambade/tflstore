
exports.get=(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
}