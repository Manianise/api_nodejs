import Validator from 'fastest-validator'
import User from '../models/user.js'
import bpkg from 'bcryptjs';
const { hash, genSalt, compare } = bpkg;
import jpkg from 'jsonwebtoken';
const { sign } = jpkg;
import 'dotenv/config'
 

export const signUp = async (req, res) => {

        await User.findOne({where:{email:req.body.email}}).then(result => {

                if(result) res.status(409).send('email already exists')

                else {

                    genSalt(10, (err, salt) => {

                            hash(req.body.password, salt, (err, hash) => {

					const user = {
                                            name: req.body.name,
                                            email: req.body.email,
                                            password: hash
                                    }
					const schema = {
						name: {type:"string", optionnal: false, max:30},
						email:  {type:"string", optionnal: false, max:50},
						password: {type:"string", optionnal: false, min:8}
                                	}

					const v = new Validator()
					const validationRes = v.validate(user, schema)
					if (validationRes !== true) {return res.status(400).json({message:'Validation failed : password must be at least 8 characters long'})}
					else {
					    User.create(user).then(result => {
						    res.status(201).send('Created successfully')
					    }).catch(error => {
						   res.status(500).send(`ERROR creating User : ${error}`)
					    })
					}
                            })
                    })
                }
        }).catch(error => res.status(500).send(`ERROR finding user : ${error}`))
}


export const login = async (req, res) => {
        await User.findOne({where:{email:req.body.email,name:req.body.name}}).then(user => {
                console.log(user);
                if(user === null)  res.status(401).send(`ERROR User : Invalid credentials`)
                else {
                        compare(req.body.password, user.password, (err, result) => {
                            if(result) {
                                const token = sign({
                                    email: user.email,
                                    id: user.id
                                    }, process.env.JWT_KEY, (err, token) => res.status(200).json({
                                        message: 'Authentication successful',
                                        token: token
                                    }))
                            } else res.status(401).send(`ERROR User : Invalid credentials`)
                        })
                                
                }
        }).catch(err => res.status(500).send(`ERROR logging User : ${err}`))
}