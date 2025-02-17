import React from 'react';
import CustomItemPage from '../DisplayItems/CustomItemPage';
import hallsData from '../../assets/data/halls.json';

const HallsPage = () => {
  return (
    <CustomItemPage
      data={hallsData}
      pageTitle="Halls"
      searchPlaceholder="Search City"
      detailPath="/halls"
    />
  );
};

export default HallsPage;
