const siteRouter = require("./site")
const blogRouter = require('./blog')
function route(app) {
    
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
   
    app.use('/', siteRouter);
    app.use('/blog', blogRouter)
    
  
}
module.exports = route;