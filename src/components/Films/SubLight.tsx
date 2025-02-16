import { Link } from 'react-router';
import './SubLight.css';


interface SubLightProps {
    id: number;
    title: string;
    releaseYear: number;
    score: number;
  }
  
  export default function SubLight(props: SubLightProps) {
    const { id, title, releaseYear, score } = props;
    const backgroundImageUrl = `https://picsum.photos/seed/${id}/300/200`;
  
    return (
      <div
        className="sublight-card"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        <Link to={`/film/${id}`}>
        <div className="sublight-content" >
          <h4>{title}</h4>
          <p>{releaseYear}</p>
          <p className='sublight-score'>{score}/100</p>
        </div>
        </Link>
      </div>
    );
  }
  