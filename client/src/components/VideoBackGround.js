import React from 'react'
import video from '../Images/bg2.mp4'
export default function VideoBackGround() {
  return (
    <div className="video-background">
      <video src={video} autoPlay loop muted/>
    </div>
  )
}
