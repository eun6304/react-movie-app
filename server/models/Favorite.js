const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
  userFrom : {
    type :  Schema.Types.ObjectId,
    ref : 'User' // User 정보를 다 가져올 수 있음
  },
  movieId : {
    type : String,
  },
  movieTitle : {
    type : String
  },
  moviePost : {
    type : String
  },
  movieRunTime : {
    type : String
  }
}, { timestamps : true }) // 생성된 시간을 자동으로 처리 해줌

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { Favorite }