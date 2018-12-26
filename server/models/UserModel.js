import mongoose from 'mongoose'

import UserSchema from "../schemas/UserShema"

const { model } = mongoose

const UserModel = model('User', UserSchema)

export default UserModel