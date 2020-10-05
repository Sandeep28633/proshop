const bcrypt =  require('bcryptjs');

const user = [
    {
        name:'admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('admin123',8),
        isAdmin:true
    },
    {
        name:'test1',
        email:'test1@gmail.com',
        password:bcrypt.hashSync('test123',8),
        isAdmin:true
    },
    {
        name:'test2',
        email:'test2@gmail.com',
        password:bcrypt.hashSync('test123',8),
        isAdmin:true
    }
]


module.exports = user