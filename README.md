# BuildWeek-4_15_19-BetterProfessor-BE
Back End Project

## Endpoints

- Base URL is https://betterprofessor.herokuapp.com/api

### Register
POST to URL/register with username (email@example.com) and password in the body of the post request

### Login
POST to URL/login with username (email@example.com) and password in the body of the post request.
This will return a json web token (Read more at https://jwt.io/). This will need to be returned in the head of every request for the routes below or they will return an error. 

### User's list of students and their info
GET request URL/professor-student-info and send along the token you received from the login route in the headers of the request {"Authorization": token}.
This route will send back an array containing all of that user's associated student's information including that student's current project's under that professor.
Example:
[{
  "student_id": 8,
  "firstname": "Jillian",
  "lastname": "Hartmann",
  "email": "Imelda_Mann47@gmail.com",
  "project": [
      {
          "project_id": 4,
          "project_name": "Sun Rise/set Time Finder",
          "project_deadline": "2019-04-18T12:00:00.000Z",
          "feedback_deadline": "2019-04-20T12:00:00.000Z",
          "recommendation_deadline": "2019-05-01T12:00:00.000Z",
          "studentMessage": "You can't calculate the monitor without programming the cross-platform SAS capacitor!",
          "professorMessage": "The SSL microchip is down, index the solid state bus so we can copy the XSS firewall!"
      },
      {
          "project_id": 4,
          "project_name": "Sun Rise/set Time Finder",
          "project_deadline": "2019-04-18T12:00:00.000Z",
          "feedback_deadline": "2019-04-20T12:00:00.000Z",
          "recommendation_deadline": "2019-05-01T12:00:00.000Z",
          "studentMessage": "You can't calculate the monitor without programming the cross-platform SAS capacitor!",
          "professorMessage": "The SSL microchip is down, index the solid state bus so we can copy the XSS firewall!"
      },
      {
          "project_id": 1,
          "project_name": "Static Code Checker",
          "project_deadline": "2019-05-08T12:00:00.000Z",
          "feedback_deadline": "2019-05-10T12:00:00.000Z",
          "recommendation_deadline": "2019-06-01T12:00:00.000Z",
          "studentMessage": "You can't back up the interface without programming the online HTTP application!",
          "professorMessage": ""
      }
  ]
}]

This professor only has one student, the pattern would repeat if more students.  Note student is not a real person, this is an example.

### Students
send along the token you received from the login route in the headers of the request {"Authorization": token}.
Example:
Follows RESTful pattern.

##### GET /students
- This route will send back an array containing all of the students.

example info that comes back
[
  {
    "id": 2,
    "firstname": "Mckayla",
    "lastname": "Steuber",
    "email": "Antonio_Hilpert58@yahoo.com"
  },
  {
    "id": 3,
    "firstname": "Holden",
    "lastname": "Gusikowski",
    "email": "Melisa_King0@yahoo.com"
  }
]

##### GET /students/:id
- This route will send back an individual student.

example info that comes back

{
  "id": 2,
  "firstname": "Mckayla",
  "lastname": "Steuber",
  "email": "Antonio_Hilpert58@yahoo.com"
}

##### POST /students
- This route will create a student.

example info that comes back
{"message": "student has been registered" }


##### PUT /students/:id
- This route will update a student's info.
example info that comes back
{"message": "student has been registered" }

##### DEL /students/:id
- This route will delete a student by id.
example info that comes back
{"message": "You changed the student's info"}






### Projects
Follows RESTful pattern.
This follows the same pattern as the /students route above.

##### GET /projects
- This route will send back an array containing all projects.

example info that comes back
[
  {
    "id": 1,
    "project_name": "Static Code Checker",
    "project_deadline": "2019-05-08T12:00:00.000Z",
    "feedback_deadline": "2019-05-10T12:00:00.000Z",
    "recommendation_deadline": "2019-06-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "project_name": "dynamic Hand Gesture Recognition using neural network",
    "project_deadline": "2019-04-18T12:00:00.000Z",
    "feedback_deadline": "2019-04-20T12:00:00.000Z",
    "recommendation_deadline": "2019-05-01T12:00:00.000Z"
  }
]
##### GET /projects/:id
- This route will send back an individual project.

example info that comes back

{
  "id": 1,
  "project_name": "Static Code Checker",
  "project_deadline": "2019-05-08T12:00:00.000Z",
  "feedback_deadline": "2019-05-10T12:00:00.000Z",
  "recommendation_deadline": "2019-06-01T12:00:00.000Z"
}

##### POST /projects 
- This route will create a project.

example info that comes back
{
    "message": "Funny Quote Generator has been created"
}

##### PUT /projects/:id
- This route will update a project's info.
Necessary Info:

{
    "projectName": "Inspirational Quote Generator",
    "projectDeadline": "2019-05-08 12:00:00",
    "feedbackDeadline": "2019-05-10 12:00:00",
    "recommendationDeadline": "2019-06-01 12:00:00"
}

example info that comes back
{
    "message": "You changed the project's info"
}

##### DEL /projects/:id
This route deletes the project by id

example info that comes back:
{
    "message": "Project Deleted"
}
