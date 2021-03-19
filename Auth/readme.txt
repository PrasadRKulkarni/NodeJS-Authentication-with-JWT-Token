Video URL :  https://www.youtube.com/watch?v=2jqok-WgelI

Pass from Postman:
URL: http://localhost:3000/api/user/register
Method: Post
Register Request Body:
{
	"name": "Vaishnavi",
	"email" : "Vai@gmail.com",
	"password": "Vaishnavi"	
}

Login URL : http://localhost:3000/api/user/login
Method: Post
Login Request Body:
{
	"email" : "Prasad@gmail.com",
	"password": "Prasad"	
}

To check JSON authorization to homepage
Home URL : http://localhost:3000/api/posts
Request Header -:
auth-token : put that is generated in login.