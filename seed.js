var User = require('./app/models/user.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp');

var doctor = {
  email: 'otto@example.com',
  password: '1234',
  type: 'doctor',
  name: 'Dr. Otto Machine',
  age: 50,
  address: '1234 Main St',
  files: []
};

var patients = [
  {
    email: 'jsmith@example.com',
    password: '1234',
    type: 'patient',
    name: 'John Smith',
    age: 27,
    address: '555 North St',
    files: []
  },
  {
    email: 'jdoe@example.com',
    password: '1234',
    type: 'patient',
    name: 'John Doe',
    age: 34,
    address: '222 East St',
    files: []
  },
  {
    email: 'jjohnson@example.com',
    password: '1234',
    type: 'patient',
    name: 'John Johnson',
    age: 28,
    address: '444 West St',
    files: []
  },
];

User.remove({}, function() {
  User.create(doctor, function(err, doc) {
    if (err) {
      throw err;
    } else {
      patients.forEach(function(patient) {
        patient.doctorId = doc._id;
        User.create(patient);
      });
    }
  });
});