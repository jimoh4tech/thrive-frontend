import { MSME1, MSME2 } from 'src/assets/images';

const msme = {
  title: 'Entrepreneurship in Nigeria',
  intro:
    'The MSME sector is the growth engine of any economy contributing to its development, job creation and export amongst others. SMEs contribute nearly 50% of the country’s GDP and account for over 80% of employment in the country.',
  body1: {
    image: MSME1.src,
    text: `
    <p>The growth and development of Entrepreneurship into sustainable businesses depends largely on the business environment they operate in. The Entrepreneurship Space seeks to achieve this by ensuring relevant actors constantly engage and come up with suitable conditions for ease of doing business.</p> 
    <p>According to the “National Policy on Micro, Small and Medium Enterprises” Federal Republic of Nigeria by SMEDAN 2020. The key pillars within the MSME/Entrepreneurship space are. </p>
    
    <ul style="padding: revert;">
        <li>Legal and Regulatory Framework & Infrastructure</li>
        <li>Technology, Research and Development</li>
        <li>Human Capital Development</li>
        <li>Support Services</li>
        <li>Marketing</li>
        <li>Finance</li>
    </ul> `,
  },
  body2: {
    image: MSME2.src,
    text: 'A key objective for this Space to flourish is to ensure Entrepreneurship development actors collate relevant information and referrals for Entrepreneurs to then have easy access to current, and relevant business development solutions.',
  },
  // body3: {
  //   image: MSME3.src,
  //   title: 'THRIVE and ',
  // },
};

export default msme;
