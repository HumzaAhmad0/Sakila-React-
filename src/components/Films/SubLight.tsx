import { Link } from 'react-router';
import './SubLight.css';
import { PartialFilm } from '../../types';


interface SubLightProps {
    film: PartialFilm
    index: number
  }
  
  export default function SubLight(props: SubLightProps) {
    const { id, title, releaseYear, score} = props.film;
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
          <h4 data-testid={`sublight-${props.index}`}>{title}</h4>
          <p>{releaseYear}</p>
          <p className='sublight-score'>{score}/100</p>
        </div>
        </Link>
      </div>
    );
  }
  