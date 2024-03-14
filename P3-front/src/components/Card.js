import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Card = (props) => {
  const { href, image, title, description } = props;

  return (
    <Link to= {href}>
        <article>
            <figure>
                <img
                src= {image}
                alt="Preview"
                />
            </figure>
            <div className="article-preview">
                <h2>{title}</h2>
                <p>
                    {description}
                </p>
            </div>
        </article>
    </Link>
  );
};

Card.prototypes = {
  href: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
export default Card;