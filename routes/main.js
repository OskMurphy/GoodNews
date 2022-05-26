const router = require('express').Router();
const { User, Word, UserWord } = require('../db/models')

router.get('/', (req, res) => {
	res.render('entries/mainPage');
});

router.post('/word', async (req, res) => {
	const { word, wordException } = req.body;
	try {
		if (word !== "") {
			const wordInDb = await Word.findOne({ where: { name: word } });
			console.log(wordInDb);
			if (wordInDb) {
				const newCounter = counter(wordInDb.counter);
				await Word.update(
					{ counter: newCounter },
					{ where: { name: word } }
				);
			} else {
				const newNote = await Word.create({ name: word, status: true, counter: '1' });
				await UserWord.create({ user_id: req.session.user.id, word_id: newNote.id })
			}
		}
		res.status(200).send()
	} catch (err) {
		res.status(500).send()
	}
})

function counter(str) {
	let num = Number(str);
	num++;
	return String(num);
}

module.exports = router;
