import './SpotLight.css';

interface SpotLightProps {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  score: number;
}

export default function SpotLight(props: SpotLightProps) {
  const { id, title, description, releaseYear, score } = props;

  const backgroundImageUrl = `https://picsum.photos/seed/${id}/1500/550`;

  return (
    <div
      className="spotlight-card"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="spotlight-content">
        <h3 className="spotlight-title">{title}</h3>
        <p className="spotlight-description">{description}</p>
        <p className="spotlight-release-year">Release Year: {releaseYear}</p>
        <div className="spotlight-score">{score}/100</div>
      </div>
    </div>
  );
}
