import {Schema, model, connect} from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs'

// 1. Create an interface representing a document in MongoDB.
interface User {
    name:string, 
    email:string, 
    password: string, 
    avatar?: string 
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<User>({
    name: { type:String, required:true}, 
    email: { type:String, required:true, unique:true}, 
    password: { type:String, required: true}, 
    avatar: String
});

UserSchema.pre('save', function(next)  {
    var user = this;
    if(this.isModified('password') || this.isNew()) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) { 
                return next(err);
            }else {
                bcrypt.hash(user.password, salt, null, function(err, hash) {
                    if(err) {
                        return next(err);
                    }
                    user.password = hash;
                    return next();
                })
            }
        })
    }
    else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error)
        }
        callback(null, isMatch)
    })
}
// 3. Create a Model and export it 
export const User = model<User>('User', UserSchema);



// run().catch(err => console.log(err));

// async function run(): Promise<void> {
//      // 4. Connect to MongoDB
//      await connect('mongodb://localhost:27017/test');
     

//   const doc = new UserModel({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await doc.save();

//   console.log(doc.email); // 'bill@initech.com'
// }
