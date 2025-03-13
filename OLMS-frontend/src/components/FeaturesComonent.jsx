import React from 'react';
import prensentation from '../assets/olms/presentation (1).png';
import paperless from '../assets/olms/paperless (3).png'
import secure from '../assets/olms/secure.png'
import data from '../assets/olms/data-analysis (1).png'
import responsive from '../assets/olms/responsive-design.png'
import globe from '../assets/olms/globe-grid.png'
import FeatureCard from './FeatureCard';

const FeaturesComonent = () => {
  const features = [
    { img: prensentation, heading: "3-Tier Portals", content: "HoD, Teacher & Student Portals" },
    { img: paperless, heading: "Paperless", content: "Removes manual writing works" },
    { img: secure, heading: "Secure", content: "Powered by JWT" },
    
  ];
  const features2 = [
    { img: data, heading: "Status Dashboards", content: "Insights from Interactive visualizations" },
    { img: responsive, heading: "Responsive", content: "Compatible across multiple devices" },
    { img: globe, heading: "Accesible", content: "Remotely accesible to educational institutions" }
  ]

  return (
    <>
    <div className='flex flex-col gap-10 sm:gap-28'>
      <div className='mt-16'>

      <FeatureCard features={features}/>
      </div>
      <div className='pb-20'>

      <FeatureCard features={features2}/>
      </div>
    </div>
    </>
  );
};

export default FeaturesComonent;
