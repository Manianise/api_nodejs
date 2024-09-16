import Validator from 'fastest-validator'
import Member from '../models/Member.js'


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @function save will register Member in API
 */
export const save = (req, res) => {
	Member.findOne({where:{email:req.body.email}}).then(result => {
		const member = {
				name: req.body.name,
				lastName: req.body.lastName,
				phone: req.body.phone,
				email:  req.body.email,
				url: req.body.url
		}

		const schema = {
				name: {type:"string", optional: false, max:"30"},
				lastName: {type:"string", optional: false, max:"30"},
				phone: {type:"string", optional: false, max:"30"},
				email:  {type:"string", optional: false, max:"100"},
				url: {type:"string", optional: true}
		}

		const v = new Validator()
		const validationRes = v.validate(member, schema)
		if (validationRes !== true) {return res.status(400).json({message:'Validation failed', error: 'Validation failure'})}
		else {
				Member.create(member).then(result => {
						res.status(201).json({
								message:'Un membre a été ajouté avec succès',
								member: result
						})
				}).catch(error => {
						res.status(500).json({
								message:'Something went wrong',
								error: error
						})
				})
		}
	})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns a single Member
 */
export const show = (req,res) => {
	const id = req.params.id
	Member.findByPk(id).then(result => {
		if(result) res.status(200).json(result)
		else res.sendStatus(404)
	}).catch(error => {
		res.status(500).json({
			message:"Error retrieving Member",
			error: error
		})
	})
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * @returns All the members of the team with creds
 */
export const showAll = (req,res) => {
	const id = req.params.id
	Member.findAll().then(result => {
		res.status(200).json(result)
	}).catch(error => {
		res.status(500).json({
			message:"Error retrieving Member",
			error: error
		})
	})
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @returns All the members of the team, but only by ID and last name
 */
export const index = (req,res) => {
	const id = req.params.id
	Member.findAll({attributes:['id','lastName']}).then(result => {
		res.status(200).json(result)
	}).catch(error => {
		res.status(500).json({
			message:"Error retrieving Member",
			error: error
		})
	})
}

export const update = (req, res) => {
	const id = req.params.id	
	const updatedMember = { 
		name: req.body.name,
		lastName: req.body.lastName,
		phone: req.body.phone,
		email:  req.body.email,
		url: req.body.url
	}

	const schema = {
		name: {type:"string", optional: true},
		lastName: {type:"string", optional: true},
		phone: {type:"string", optional: true},
		email:  {type:"string", optional: true},
		url:  {type:"string", optional: true}
	}

	const v = new Validator()
	const validationRes = v.validate(updatedMember, schema)
	if (validationRes !== true) {return res.status(400).json({message:'Validation Failed'})}
	else {
		Member.update(updatedMember, {where:{id:id}}).then(result => {
			res.status(200).json({
				message:'Un membre a été mis à jour avec succès',
				member: result
			})
		}).catch(error => {
			res.status(500).json({
				message:'Something went wrong',
				error: error
			})
		}) 
	}
}


export const destroy = (req,res) => {
	console.log('sent')
	const id = req.params.id
	Member.destroy({where:{id:[id]}}).then(result => {
		res.status(200).json({
			message: "Un membre a été supprimé avec succès",
		})
	}).catch(error => {
		res.status(500).json({
			message:"Error retrieving Member",
			error: error
		})
	})
}