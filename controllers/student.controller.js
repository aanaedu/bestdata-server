const Student = require('../models/student.model');


exports.create = function (req, res) {
    let student = {};
    student.studentNumber = req.body.studentNumber;
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.gender = req.body.gender;
    student.dateOfBirth = req.body.dateOfBirth;
    student.phoneNumber = req.body.phoneNumber;
    student.email = req.body.email;
    student.address = req.body.address;

    Object.keys(student).forEach(function (key) {
        let item = student[key];
        if (!item && item.trim().length === 0) {
            res.status(400).json({error: {messages: [`${key.toUpperCase()} is a required field.`]}});
        }
    }, this);

    let newStudent = new Student(student);

    newStudent.save((err) => {
        if (err) return res.status(500).send({error: {messages: [err.message || err]}});
        res.json({message: "Student was created successfully!"});
    });
};

exports.createBulk = function (req, res) {
    let students = req.body;
    Student.insertMany(students)
        .then((student) => {
            res.send({message: `Students were created successfully`});
        })
        .catch((err) => {
            return res.status(500).send({error: {messages: [err.message || err]}});
        });
};

exports.findAll = function (req, res) {
    Student.find({}, (err, students) => {
        if (err) {
            return res.status(404).send({error: {messages: [err.message || err]}});
        }
        res.json(students);
    })
};

exports.findOne = function (req, res) {
    const id = req.params.id;
    Student.find({_id: id}, (err, student) => {
        if (err) {
            return res.status(404).send({error: {messages: [err.message || err]}});
        }
        res.json(student);
    })
};

exports.update = function (req, res) {
    let id = req.params.id;
    let newStudent = {};

    if (req.body.firstName) {
        newStudent.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        newStudent.lastName = req.body.lastName;
    }
    if (req.body.gender) {
        newStudent.gender = req.body.gender;
    }
    if (req.body.dateOfBirth) {
        newStudent.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.phoneNumber) {
        newStudent.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.email) {
        newStudent.email = req.body.email;
    }
    if (req.body.address) {
        newStudent.address = req.body.address;
    }

    Object.keys(newStudent).forEach(function (key) {
        let item = newStudent[key];
        if (!item && item.trim().length === 0) {
            res.status(400).json({error: {messages: [`${key.toUpperCase()} is a required field.`]}});
        }
    }, this);

    Student.findByIdAndUpdate({_id: id}, newStudent, {upsert: true}, (err, student) => {
        if (err) res.status(500).send({error: {messages: [err.message || err]}});
        res.json({message: "Student record was updated successfully."});
    });

};

exports.delete = function (req, res) {
    let id = req.params.id;

    Student.findOneAndRemove({_id: id}, (err, student) => {
        if (err) {
            return res.status(500).send({error: {messages: [err.message || err]}});
        }else if (!student) {
            return res.status(404).send({ message: 'Error: No Student Record not found.'})
        }
        return res.send({message: `Student was deleted succefully!`});
    })
};
