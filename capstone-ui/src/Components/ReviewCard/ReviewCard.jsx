import * as React from 'react'
import './ReviewCard.css'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function ReviewCard({review}) {
    
    const [comment, setComment] = (review?.comment)
    const {user, setPopupType, setDeleteAction, showPopup} = useAuthNavContext()

    function timeSince() {

        var seconds = new Date(Date.now()) - new Date(review?.created_at);
    
        var interval = seconds / 31536000000;
    
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400000;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600000;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60000;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds / 1000) + " seconds";
    }

    const handleOnDelete = () => {
        setPopupType("Confirm")
        setDeleteAction("review")
        localStorage.setItem("review_id", review.id)
        showPopup()
    }

  return ( 
    <div className='review-card'>
        <div className="review-img">
            <img src={review?.image_url ? review.image_url : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"} alt="profile-img" />
        </div>
        <div className="review-detail">
            <div className="review-content">
                <h5>{review?.username} <span>{timeSince()} ago</span></h5>
                <p>{review?.comment}</p>
            </div>
            <div className="review-btns" onClick={handleOnDelete}>
                {user?.id === review?.user_id ? <span className='close-btn'>x</span> : null }
            </div>
        </div>
    </div>
  )
}
