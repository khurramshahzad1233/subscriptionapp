import React, { Fragment } from 'react'
import "./Home.css"
import {Link} from "react-router-dom"
import {Google,YouTube} from "@mui/icons-material"
import {SiCoursera,SiUdemy} from "react-icons/si"
import {DiAws} from "react-icons/di"
import introvideo from "../assets/videos/intro.mp4";
import bg from "../assets/images/bg.png"

const Home = () => {
  return (
    <Fragment>
      <div className="homemain">
      <div className="homecontainer">
        <div className="sectiondiv">
            <h3>LEARN FROM THE EXPERTS</h3>
            <p>Find Valueable Content At Reasonable Price</p>
            <Link to={`/courses`}><button>Explore Now</button></Link>
            </div>
            <div className="graphicimage">
                <img src={bg} alt='graphic_avatar' />
            </div>
        </div>
        <div className="brands">
        <h4>OUR BRANDS</h4>
                <p><Google/><YouTube/><SiCoursera/><SiUdemy/><DiAws/></p>
            </div>
            <div className="homeintrovideo">
                <video src={introvideo}
                controls
                muted
                controlsList='nodownload nofullscreen noremoteplayback'
                disablePictureInPicture
                disableRemotePlayback
                ></video>
        </div>

      </div>
        

            
            

    </Fragment>
  )
}

export default Home