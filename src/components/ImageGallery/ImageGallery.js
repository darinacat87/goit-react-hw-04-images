import Proptypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <div>
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          );
        })}
      </Gallery>
    </div>
  );
};

ImageGallery.propTypes = {
  images: Proptypes.arrayOf(
    Proptypes.shape({ id: Proptypes.number.isRequired })
  ),
  onClick: Proptypes.func.isRequired,
};


