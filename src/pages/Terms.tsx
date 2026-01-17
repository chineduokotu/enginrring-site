import React from 'react';

const Terms: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 17, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl prose-custom">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by PowerTech Engineering ("Company," "we," "us," or "our"),
              you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms,
              you may not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              PowerTech Engineering provides electrical installation, CCTV and security systems, solar energy solutions,
              smart home automation, and electric fencing services. All services are subject to availability and may vary
              by location.
            </p>

            <h2>3. Quotations and Pricing</h2>
            <p>
              All quotations provided are valid for 30 days from the date of issue unless otherwise stated. Prices are
              subject to change and may vary based on the complexity of the project, materials required, and site conditions.
            </p>
            <ul>
              <li>Quotations are estimates and final pricing may vary upon site inspection</li>
              <li>Additional work not included in the original scope will be quoted separately</li>
              <li>Payment terms will be specified in individual project agreements</li>
            </ul>

            <h2>4. Warranties</h2>
            <p>
              We provide warranties on our workmanship and installed products. The warranty period varies by service type:
            </p>
            <ul>
              <li>Electrical Installation: 2-year workmanship warranty</li>
              <li>CCTV Systems: 1-year comprehensive warranty</li>
              <li>Solar Panels: As per manufacturer warranty (typically 10-25 years)</li>
              <li>Smart Home Systems: 1-year workmanship warranty</li>
              <li>Electric Fencing: 1-year workmanship warranty</li>
            </ul>

            <h2>5. Client Responsibilities</h2>
            <p>
              Clients are responsible for:
            </p>
            <ul>
              <li>Providing accurate information about their requirements</li>
              <li>Ensuring safe access to work areas</li>
              <li>Obtaining necessary permits or approvals where required</li>
              <li>Maintaining installed systems as per provided guidelines</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              PowerTech Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from the use of our services. Our total liability shall not exceed the amount paid for the
              specific service in question.
            </p>

            <h2>7. Safety and Compliance</h2>
            <p>
              All installations are performed in accordance with local electrical codes and safety regulations. We are
              fully licensed and insured. Clients must not modify or tamper with installed systems, as this may void
              warranties and create safety hazards.
            </p>

            <h2>8. Cancellation Policy</h2>
            <p>
              Cancellations must be made at least 48 hours before scheduled work. Deposits may be non-refundable depending
              on the project stage. Custom orders and special materials are non-refundable once ordered.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              All designs, documentation, and technical specifications created by PowerTech Engineering remain our
              intellectual property unless explicitly transferred in writing.
            </p>

            <h2>10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or our services shall first be addressed through good-faith negotiations.
              If unresolved, disputes shall be subject to binding arbitration in accordance with local laws.
            </p>

            <h2>11. Modifications</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting
              to our website. Continued use of our services constitutes acceptance of modified terms.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions regarding these Terms and Conditions, please contact us:
            </p>
            <ul>
              <li>Email: legal@powertech.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Engineering Way, Tech City, TC 12345</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
