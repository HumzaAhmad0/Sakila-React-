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
        <div data-testid={`sublight-${props.index}`} className="sublight-content" >
          <h4 data-testid={`sublight-title-${props.index}`}>{title}</h4>
          <p data-testid={`sublight-year-${props.index}`}>{releaseYear}</p>
          <p data-testid={`sublight-score-${props.index}`} className='sublight-score'>{score}/100</p>
        </div>
        </Link>
      </div>
    );
  }
  