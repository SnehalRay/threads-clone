import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text:{
        type: String,
        maxLength: 500

    },
    img:{
        type: String,
        default: null

    },
    likesPeople:{
        type:[String],
        default:[]
    }
    ,
    likes:{
        type: Number,
        default: 0

    },
    replies:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            reply:{
                type: String,
                maxLength: 500
            },
            likes:{
                type: Number,
                default: 0
            }

        }
    ]
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema);

export default Post;