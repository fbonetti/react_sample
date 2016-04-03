var User = require('./app/models/user.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp');

var doctor = {
  email: 'otto@example.com',
  password: '1234',
  name: 'Dr. Otto Machine',
  age: 50,
  address: '1234 Main St'
};

var patients = [
  {
    email: 'jsmith@example.com',
    password: '1234',
    name: 'John Smith',
    age: 27,
    address: '555 North St'
  },
  {
    email: 'jdoe@example.com',
    password: '1234',
    name: 'John Doe',
    age: 34,
    address: '222 East St'
  },
  {
    email: 'jjohnson@example.com',
    password: '1234',
    name: 'John Johnson',
    age: 28,
    address: '444 West St'
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