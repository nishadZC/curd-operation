import React from 'react';
import "./main-css/services.css"

const servicesData = [
  {
    title: "Event Planning",
    description: "Plan your perfect event with ease! Whether it's a wedding, birthday, corporate event, or any special occasion, we help you bring your vision to life.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLQLWoVbworZ9nXz40X5KGv4Wj41YNwKRVw&s",
    alt: "event-planning"
  },
  {
    title: "Event Management",
    description: "We turn your dream event into reality with seamless planning and execution.",
    image: "https://media.licdn.com/dms/image/v2/C4D12AQHbFAgJm3O16w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1618318102565?e=2147483647&v=beta&t=NKSioZnKzeTuTO97v15fZgB4mT0BUggujs-4Y4tdQ4U",
    alt: "evet-management"
  },
  {
    title: "Event Coordinator",
    description: "An Event Coordinator ensures every aspect of your event runs smoothly, from planning to execution.",
    image: "https://cdnl.iconscout.com/lottie/premium/thumb/process-management-animation-download-in-lottie-json-gif-static-svg-file-formats--flow-task-manage-event-business-character-pack-people-animations-4651682.gif",
    alt: "event-coordinator"
  },
  {
    title: "Event Marketing",
    description: "Maximize your event’s reach with strategic marketing . ",
    image: "https://media.licdn.com/dms/image/v2/D5612AQHAjuQVVC5-zA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1657725931052?e=2147483647&v=beta&t=buJNrnULUjCwAT8ywrxYNsxLPbFbVG1SnYEqjY73w50",
    alt: "event-marketing"
  },
  {
    title: "Event Promotion",
    description: "Boost attendance and engagement with our expert event promotion strategies! .",
    image: "https://cdn.prod.website-files.com/57822c659e1627a433e6a7c6/60a48dad9548b25e0af86768_iC2Aaf5UG2oPx6Kh18wrGewUGDtyVABcPzSmk9Qn5gGIdGWYYhlHASzdh5itfRfhH-QriyDFE612HTsSWVswrgHRyq2lz4JNMMKZ5rGOKlI0b6V-C8OgEE6iwpY-M6cHG7S9un9P.gif",
    alt: "event-promotion"
  }
];

const Services = () => {
  return (
    <section id="services" className="services-section">
      <h2>Services</h2>
      <p>We provide a full range of event services to make your special occasion stress-free and memorable. From planning to execution, we handle everything with creativity and precision.</p>

      <div className="service-list">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <img
              src={service.image}
              alt={service.alt}
            />
            <div className='enquire'>
              <a
                href={`mailto:vn07244@gmail.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                enquire now! 
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
