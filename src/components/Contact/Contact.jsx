import React from "react";
import contactUsImage from "../../assets/contact.webp";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = () => {
  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <h2 className="text-center mb-5 fw-bold">CONTACT US</h2>

      <div className="row align-items-center g-5">
        {/* Left Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={contactUsImage}
            alt="Contact Us"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        </div>

        {/* Right Info & Form Section */}
        <div className="col-md-6">
          <p className="mb-4">
            Have a question, concern, or simply want to connect with us? Feel free to reach out — we’d love to hear from you.
          </p>

          {/* ✅ Contact Form */}
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Mobile</label>
                <input type="tel" className="form-control" placeholder="Enter your mobile number" />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Subject</label>
                <input type="text" className="form-control" placeholder="Enter subject" />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Comment</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-dark px-4">
                  Send Message
                </button>
              </div>
            </div>
          </form>

          {/* ✅ Contact Info */}
          <div className="mt-5">
            <h5 className="fw-bold mb-3">Our Contact Info</h5>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:contact.jemzypk@gmail.com">contact.jemzypk@gmail.com</a></li>
              <li>Phone: <a href="tel:+923274243417">0327 4243417</a></li>
              <li>Address: Jemzy.pk, Lahore, Pakistan</li>
            </ul>

            <h5 className="fw-bold mt-4 mb-2">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark text-decoration-none">Facebook</a>
              <a href="#" className="text-dark text-decoration-none">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
