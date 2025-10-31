import React from "react";
import exchange from "../../../assets/exchange.webp";
import verified from "../../../assets/verified.webp";
import support from "../../../assets/support.webp";
import "./OurPolicy.css";

const OurPolicy = () => {
  const policies = [
    {
      id: 1,
      image: exchange,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      hiddenOnMobile: true,
    },
    {
      id: 2,
      image: verified,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy",
    },
    {
      id: 3,
      image: support,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
    },
  ];

  return (
    <div className="our-policy-container">
      {policies.map((policy) => (
        <div
          key={policy.id}
          className={`policy-card ${policy.hiddenOnMobile ? "hidden-sm" : ""}`}
        >
          <img src={policy.image} alt={policy.title} className="policy-image" />
          <p className="policy-title">{policy.title}</p>
          <p className="policy-description">{policy.description}</p>
          
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
