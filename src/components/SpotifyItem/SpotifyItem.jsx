import React from 'react';
import PropTypes from 'prop-types';

import './SpotifyItem.scss';

const SpotifyItem = ({ name, imgSrc, description, src, totalTracks }) => (
  <div className="spotify-item" title={description}>
    <span>
      {name} having {totalTracks} tracks
    </span>
    <a href={src} target="_blank" rel="noreferrer">
      <img src={imgSrc} width={50} height={50} alt={name} />
    </a>
  </div>
);

SpotifyItem.props = (data) => ({
  name: data.name,
  imgSrc: data.images[0]?.url ?? '',
  description: data.description,
  src: data?.external_urls?.spotify ?? '',
  totalTracks: data?.tracks?.total ?? 0,
});

SpotifyItem.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  totalTracks: PropTypes.number.isRequired,
};

export default SpotifyItem;
