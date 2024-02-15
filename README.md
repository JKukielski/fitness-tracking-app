
# MERN Fitness Tracking & Exercise App

The main ideas behind this application are to allow a potential user to track some  of their key parameters related to fitness and exercise, such as weight, BMI or BMR. 

Based on the details provided by the user they are able to see what they should do to achieve their targets as the application automatically calculates all data.






## Tech Stack

**Client:** React, Redux, Mui, ExcersiseDB API, React Router Dom

**Server:** Node, Express, MongoDB, Mongoose, JWT


## Features

**User Registration & Login**

The application has a fully functional login and registration system which allows users to create accounts and the login to view their information. The credentials entered by the user are checked against what is saved in the database and in case of errors, the front-end displays them to the user. 

Passwords are handled using the bcrypt dependancy to ensure additional security. 

**Home Page - User measurements**

After logging in the user is re-directed to the home page. From this page, they can view the parameters that they may have already entered, such as their weight or BMI and BMR measurements. These parameters are also checked against healthy recommendations as well as targets set by the user themselves.

The home page also includes inputs where the user can modify their target weight and re-calculate their BMI and BMR. All these details are automatically updated for the user upon submitting. 

**Home Page - Exercises**

The other main part of the application is based on allowing the user to search through a large database of excersises. This is enabled thanks to the Excersis DB API from Rapid API. 

In this section the user has 2 options of searching. They can use the search bar to enter specific excersises, body parts etc. or they can use the body part cards on the slider. 

Upon using one of these options they will be able to see a multitude of excersises dsiaplyed below, which are handled by the Pagination component from Mui. Each excersise card contains a gif presenting how to do the excersise as well as some basic information including body part, target muscle and excersise name. Each of these cards can be clicked to direct to the corresponding excersise detail page.

**Home Page - Navbar**

When on the home page the users are able to switch to their user page but they can also log out of the application.

**User page**

Another key feature of this application is the user page. Here users can view some of their personal information. If necessary they can edit this information.

