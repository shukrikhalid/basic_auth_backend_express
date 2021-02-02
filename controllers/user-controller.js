const bcrypt = require('bcrypt')

const { Op, User } = require('../db/mysql/models')

const { authenticateToken, isEmailFormat } = require('../services')
const jwt = require('jsonwebtoken')

UserController = {

  list: async function (req, res, next){
    try {
      let sign = await authenticateToken(req.headers['authorization']);
      if(!sign.status) {
        return res.status(401).json({ status: false, error: sign.error });
      }

      let params = res.locals.params

      let users = []
      if (params.search == undefined) {
        users = await User.findAll({
          attributes: {exclude: ['secret_hash']}
        })
      } 
      else{
        users = await User.findAll({
          attributes: {exclude: ['secret_hash']},
          where: {
            [Op.or]: [
              {
                email: { [Op.like]: '%'+params.search+'%' } 
              },
              {
                first_name: { [Op.like]: '%'+params.search+'%' } 
              },
              {
                last_name: { [Op.like]: '%'+params.search+'%' } 
              }
            ]

          }
        })
      }

      return res.json({ status:true, message: "", result:users})

    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ status:false, message: err.message })
    }
  }//,
  // show: async function (req, res, next){
  //   try {
  //     let sign = await authenticateToken(req.headers['authorization']);
  //     if(!sign.status) {
  //       return res.status(401).json({ status: false, error: sign.error });
  //     }

  //     let params = res.locals.params


      
  //     let users = await User.findByPk(params.id,{
  //       attributes: {exclude: ['secret_hash']}
  //     })
  //     return res.json({ status:true, message: "", result:users})

  //   } 
  //   catch (err) {
  //     console.log(err)
  //     return res.status(500).json({ status:false, message: err.message })
  //   }
  // }
}

module.exports = UserController