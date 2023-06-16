const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Deepakispro";

//Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'The size of username should be atleast 3').isLength({min: 3}),
    body('password', 'The size of password should be atleast 5').isLength({min: 5}),
    body('email', 'Invalid email').isEmail()
], async (req, res) =>{
    let success = false;
    //If there are errors, return bad request + errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,  errors: errors.array() });
    }
    
    try {
      //check if user with email already exist
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry, a user with this email already exists"}) 
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user 
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

  } 
  catch (error) {
      console.error(error.message)
      res.status(500).send("Internal error occured");
  }
})

//Route 2: User login using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) =>
  {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email, password} = req.body;
    try 
    {
      let user = await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({
          error: "Enter the correct credentials"
        })
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare)
      {
        return res.status(400).json({ success, 
          error: "Enter the correct credentials"
        })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal error occured");
    }
  
  })
  

//Route 3: Get logged in User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) =>
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email, password} = req.body;
    try 
    {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal error occured");
    }
  
  })

module.exports = router;