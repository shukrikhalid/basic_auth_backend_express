const jwt = require('jsonwebtoken')

exports.hideSecret = (params) => {
  for (var property in params) {
    if (/password/.test(property.toLowerCase())) {
      params[property] = "******"
    }
    else if (/token/.test(property.toLowerCase())) {
      params[property] = "******"
    }
  }

  return params
}

exports.authenticateToken = async (BearerToken) => {
  if ( !(/^[Bb]earer [-0-9a-zA-z\.]*$/.test(BearerToken) ) ) {
    return {status: false, error: "invalid authorization format" }
  }

  /* GET ONLY ACCESS TOKEN WITH WORD 'Bearer' */
  let AccessToken =  BearerToken.split(" ")[1]

  try {
    var verify = jwt.verify(AccessToken,  process.env.ACCESS_TOKEN_SECRET);
    console.log(" verify ",verify)
    if (verify) {
      return {status: true, email: verify.email }
    }
    else {
      return {status: false, error: "invalid token" }
    }
  } catch(err) {
    return {status: false, error: "invalid token" }
  }

  // await jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   console.log(err)
  //   if (err) return {status: false, error: "invalid token" }
  //   user.status = true
  //   console.log("hgchfghiokj ", user)
  //   return user
  // })

}

exports.isIsoDate = (str) => {
  /****
    To Check Date string is a valid ISO8601 
    YYYY-MM-DDTHH:MN:SS.MSSZ

    Ref https://en.wikipedia.org/wiki/ISO_8601
  ****/
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str); 
  return d.toISOString()===str;
}

exports.isEmailFormat = (str) => {
  /****
    To Check Date string is a valid email format
  ****/
  let EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return EmailRegex.test(str)
}


// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err)
//     if (err) return res.sendStatus(403)
//     req.user = user
//     console.log("user ", user)
//     next()
//   })
// }