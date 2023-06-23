import mongoose from "mongoose";
import shortid from "shortid";

const shortUrlSchema = new mongoose.Schema({
    full :{
        type : String ,
        require : true
    },
    short : {
        type : String ,
        default : shortid.generate
    }
})

export default mongoose.model('shortUrl' , shortUrlSchema )