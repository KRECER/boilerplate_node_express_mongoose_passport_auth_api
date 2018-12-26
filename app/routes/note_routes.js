import NoteModel from "../../server/models/NoteModel"

import authController from '../../server/controllers/Auth'
import projectController from '../../server/controllers/Project'
import passportManager from '../../config/passport'

const noteRoutes = (app) => {
    app.post('/signup', authController.signUp);
    app.post('/signin', authController.signIn);

    app.route('/projects')
        .get(passportManager.authenticate, projectController.get)
        .post(passportManager.authenticate, projectController.add)

    app.route('/new-developments')
        .get(passportManager.authenticate, projectController.get)
        .post(passportManager.authenticate, projectController.add)

    app.route('/notes')
        .get((req, res) => {
            NoteModel.find().exec( (err, items) => {
                if (err)
                    res.send({'error':'An error has occurred'})

                const _items = Array.from(items)
                res.send({ result: true, data: _items})
            })
        })
        .post(passportManager.authenticate, (req, res) => {
            const { title, text } = req.body
            const Note = new NoteModel({
                title,
                text
            })

            Note.save( (err, results) => {
                if (err)
                    res.send({ result: false, error: 'An error has occurred'})

                res.send({ result: true, msg: `New Doc with id: ${results.id} has been added` })
            })
        })

    app.route('/notes/:id')
       .put(passportManager.authenticate, (req, res) => {
            const { params: { id } } = req
            const { title, text } = req.body

            NoteModel.findByIdAndUpdate(id, {
                title,
                text
            }, (err, results) => {
                if (err)
                    res.send({ result: false, error: 'An error has occurred'})

                res.send({ result: true, msg: `Doc with id: ${results.id} has been updated` })
            })
        })
        .delete(passportManager.authenticate, (req, res) => {
            const { params: { id } } = req

            NoteModel.findByIdAndDelete(id, (err) => {
                if (err)
                    res.send({ result: false, error: 'An error has occurred'})

                res.send({ result: true, msg: `Doc with id: ${id} has been removed` })
            })
        })
        .get((req, res) => {
            const { params:{ id } } = req

            NoteModel
                .findById(id)
                .exec( ( err, item ) => {

                    if (err)
                        res.send({'error':'An error has occurred'})

                    res.send({ result: true, data: item })
                })
        })
}

export default noteRoutes