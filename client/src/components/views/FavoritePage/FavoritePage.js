import React, {useEffect, useState} from 'react'
import './Favorite.css'
import axios from 'axios';
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosFavoredMovie();
  }, [])
  
  const axiosFavoredMovie = () => {
    axios.post('/api/favorite/getFavoriteMovie', { userFrom : localStorage.getItem('userId')})
    .then(response => {
      if(response.data.success) {
        setFavorites(response.data.favorites)
      }else {
        alert("영화 정보를 가져오는데 실패했습니다.")
      }
    })
  }

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom
    }
    axios.post('/api/favorite/removeFromFavorite', variables)
    .then(response => {
      if(response.data.success) {
        axiosFavoredMovie();  
      } else {
        alert("리스트에서 지우는데 실패했습니다.")
      }
    })
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        { favorite.moviePost ? 
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : 'no image'}
      </div>
    )
    return <tr key={index}>
      <Popover content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>
      
      <td>{favorite.movieRunTime} mins </td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>
})

  return (
    <div style={{ width : '85%', margin : '3rem auto' }}>
      <h2> Favorite Movies </h2>
      <hr />
      {Favorites &&
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <th>Remove from favorites</th>
            </tr>
          </thead>
          <tbody>
            { renderCards }
          </tbody>
        </table>
      }
    </div>
  )
}

export default FavoritePage
