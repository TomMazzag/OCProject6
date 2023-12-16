const e = require('express');
const Sauce = require('../models/sauce');
const sauce = require('../models/sauce');

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then((sauces) => {
        res.status(200).json(sauces);
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
    });
    sauce.save().then(() => {
            res.status(201).json({
                message: 'Sauce added'
            })
        }
    ).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
          res.status(200).json(sauce);
        }
        ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
}

exports.changeOneSauce = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
            message: req.body.name + ' updated successfully!'
            });
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    )
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Not a sauce')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(400).json({
                    error: new Error('Unathorised request')
                });
            }
            Sauce.deleteOne({_id: req.params.id}).then(
                () => {
                    res.status(200).json({
                        message: 'Sauce Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error:error
                    });
            });
        }
    )
}

exports.likeSauce = (req, res, next) => {
    const like = req.body.like;
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            console.log(like)
            if (like === -1) {
                sauce.usersDisliked.push(req.body.userId)
            }
            if (like === 1) {
                sauce.usersLiked.push(req.body.userId)
            }
            if (like === 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    idIndex = sauce.usersLiked.indexOf(req.body.userId)
                    sauce.usersLiked.splice(idIndex, 1)
                } else {
                    idIndex = sauce.usersDisliked.indexOf(req.body.userId)
                    sauce.usersDisliked.splice(idIndex, 1) 
                }
            }
            sauce.dislikes = sauce.usersDisliked.length
            sauce.likes = sauce.usersLiked.length
            
            sauce.save().then(() => {
                res.status(200).json({
                    message: 'Like added'
                });
            }
            ).catch((error) => {
                res.status(400).json({
                    error: error
                })
            });
        }
    )
}