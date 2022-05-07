import './styles.css';
import video from '../../videos/background.mp4'
import { Link } from 'react-router-dom';

export default function LandingPage () {

    document.title = "Welcome"

    return (

        <div className="landing">
            <div className="background">
                <video src={video} autoPlay muted loop>
                </video>
            </div>
            <div className="welcome-backgroud">
            </div>
            <div className='welcome'>
                <h1>WELCOME</h1>
                <p>DOGS API REST </p>
            <Link to='/home'>
                <div className='btn welcome-btn'>ENTER</div>
            </Link>
            </div>
        </div>

    )

}