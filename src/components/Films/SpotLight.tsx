import { Link } from 'react-router';
import { PartialFilm } from '../../types';
import './SpotLight.css';

interface SpotLightProps {
  film: PartialFilm
}

export default function SpotLight(props: SpotLightProps) {
  const { id, title, description, releaseYear, score } = props.film;

  const backgroundImageUrl = `https://picsum.photos/seed/${id}/1500/550`;

  return (
    <div
      className="spotlight-card"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <Link to={`/film/${id}`}>
      <div data-testid="spotlight-topfilm" className="spotlight-content">
        <h3 data-testid="spotlight-title-topfilm" className="spotlight-title" >{title}</h3>
        <p data-testid="spotlight-desc-topfilm" className="spotlight-description">{description}</p>
        <p data-testid="spotlight-year-topfilm" className="spotlight-release-year">Release Year: {releaseYear}</p>
        <div data-testid="spotlight-score-topfilm" className="spotlight-score">{score}/100</div>
      </div>
      </Link>
    </div>
  );
}
