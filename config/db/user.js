const mongoose = require('mongoose');
function run(){
const uri = "mongodb+srv://pinkieluvkazuha_db_user:6LNR5BLGZBaPMS07@cluster0.iazeams.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: { version: '1' }
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌Connection error:', err.message));
}
module.exports = {run};