import React from 'react';
import CustomItemPage from '../DisplayItems/CustomItemPage';
import photographerData from '../../assets/data/photographer.json';

const Photographer = () => {
  return (
    <CustomItemPage
      data={photographerData}
      pageTitle="Photographers"
      searchPlaceholder="Search Photographer"
      detailPath="/photographers"
    />
  );
};

export default Photographer;
