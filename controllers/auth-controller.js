const bcrypt = require('bcrypt')

const { Op, User } = require('../db/mysql/models')

const { authenticateToken, isEmailFormat } = require('../services')
const jwt = require('jsonwebtoken')

AuthController = {
  
  signup: async function (req, res, next) {
    try {
      let params = res.locals.params

      if (params.email == undefined) {
        return res.status(400).json({ status:false, message: `parameter 'email' is required` })
      }
      if (!isEmailFormat(params.email)) {
        return res.status(400).json({ status:false, message: `Invalid email format '${params.email}'` })
      }
      if (params.password == undefined) {
        return res.status(400).json({ status:false, message: `parameter 'password' is required` })
      }
      if (params.password.length < 11) {
        return res.status(400).json({ status:false, message: `parameter 'password' Minimum 12 characters` })
      }
      if (!params.password.match(/([A-Z])/) ) {
        return res.status(400).json({ status:false, message: `parameter 'password' at least one upper-case alphabet` })
      }
      if (!params.password.match(/\W/) ) {
        return res.status(400).json({ status:false, message: `parameter 'password' at least one non-alphanumeric character` })
      }



      let user = await User.findOne({
        where:{
          email: params.email
        }
      })

      if (user != undefined) {
        if (user.is_verify) {
          return res.status(400).json({ status:false, message: `email is already registed` })
        }
        else{
          return res.status(400).json({ status:false, message: `email is already registed` , is_verify: user.is_verify })
        }
      }

      const hashedPassword = await bcrypt.hash(params.password, 10)

      user = await User.create(
        { 
          email: params.email,
          first_name: params.first_name,
          last_name: params.last_name,
          is_verify: true,
          secret_hash: hashedPassword
        }
      )

      return res.json({ status:true, message: "Successful signup" })
    } catch (err) {
      return res.status(500).json({ status:false, message: err.message })
    }
  },

  login: async function (req, res, next){
    try {
      let params = res.locals.params

      if (req.headers['authorization'] == undefined || !/Basic [-0-9a-zA-z\.=]*$/.test(req.headers['authorization']) ) {
        console.log(!/Basic [-0-9a-zA-z\.=]*$/.test(req.headers['authorization']))
        return res.status(401).json({ status: false, error:"invalid credential" });
      }

      auth = req.headers['authorization'].split(' ');

      let buffDecodeAuth = new Buffer.from(auth[1], 'base64');
      let decodeAuth = buffDecodeAuth.toString('ascii');

      let email = decodeAuth.split(':')[0]
      let password = decodeAuth.split(':')[1]

      let user = await User.findOne({
        where:{
          [Op.and]: [
            { email: email },
            { is_verify: true }
          ]
        }
      })

      if (user == undefined) {
        return res.status(401).json({ status: false, error:"invalid credential" });
      }

      try{
        match = await bcrypt.compare(password, user.secret_hash);
      }
      catch(err){
        console.log("error ", err)
      }

      console.log("match :",match)

      if(!match) {
        return res.status(401).json({ status: false, error:"invalid credential" });
      }

      userSign = {
        email: email,
      }

      const accessToken = await jwt.sign(userSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })

      let response = {
        accessToken: accessToken,
        username: user.email,
        id: user.id
      }
      return res.json({ status:true, message: `Login success`, result: response})
    } 
    catch (err) {
      return res.status(500).json({ status:false, message: err.message })
    }
  }
}

module.exports = AuthController
