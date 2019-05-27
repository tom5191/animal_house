const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');
const config = require('config');

module.exports = {
	createAnimal: (req, res) => {
		const { name, species, breed, trackerId, owner, age } = req.body;

		const newAnimal = new Animal({ name, species, breed, trackerId, owner, age });

		newAnimal
			.save()
			.then(animal => {
				return res.json({ animal });
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	},
	getAllAnimals: (req, res) => {
		Animal.find({ deletedAt: null })
			.then(animals => {
				return res.json({ animals });
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	},
	animalById: (req, res) => {
		const { id } = req.params;

		Animal.findById(id)
			.then(animal => {
				if (!animal) return res.status(400).json({ msg: 'No user found' });

				return res.json({ animal });
			})
			.catch(err => {
				return res.status(500).json({ msg: err.message });
			});
	},
	deleteAnimal: (req, res) => {
		const { id } = req.params;

		Animal.updateOne({ _id: id }, { deletedAt: new Date() })
			.then(() => {
				return res.status(200).end();
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	},
};
