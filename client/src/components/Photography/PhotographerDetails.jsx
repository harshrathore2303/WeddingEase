import React from 'react';
import DetailsPage from '../DisplayItems/DetailsPage';
import photographersData from '../../assets/data/photographer.json';

const PhotographerDetails = () => {
  return <DetailsPage data={photographersData} itemType="Photographer" />;
};

export default PhotographerDetails;
