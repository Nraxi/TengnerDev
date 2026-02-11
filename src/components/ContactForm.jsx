import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [state, handleSubmit] = useForm("xrgwvyed");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    // Dynamically load reCAPTCHA script when the component mounts
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (state.succeeded) {
    return (
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-white text-center">
        <h4 className="text-2xl font-bold mb-4">Thank You!</h4>
        <p>
          Your message has been successfully submitted. We appreciate you
          reaching out.
        </p>
        <p>
          We will review your message and get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h4 className="text-2xl font-bold mb-6">Mail Contact Me</h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2">
            Your Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email here"
            required
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onInput={(e) => {
              const sanitizedValue = e.target.value.replace(
                /<\s*script\s*>|<\s*\/\s*script\s*>/gi,
                "",
              );
              e.target.value = sanitizedValue;
            }}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Please fill in your Full Name, your statement and some contact info, example phone number. English or Swedish only."
            required
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onInput={(e) => {
              const sanitizedValue = e.target.value.replace(
                /<\s*script\s*>|<\s*\/\s*script\s*>/gi,
                "",
              );
              e.target.value = sanitizedValue;
            }}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        {/* Radio Buttons */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="option1"
              name="options"
              value="Option 1"
              checked={selectedOption === "Option 1"}
              onChange={handleOptionChange}
              className="accent-indigo-500"
            />
            <label htmlFor="option1" className="text-gray-300">
              I don't accept these terms
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="option2"
              name="options"
              value="Option 2"
              checked={selectedOption === "Option 2"}
              onChange={handleOptionChange}
              className="accent-indigo-500"
            />
            <label htmlFor="option2" className="text-gray-300">
              I'm accepting these terms
            </label>
          </div>
          <ValidationError
            prefix="Options"
            field="options"
            errors={state.errors}
          />
        </div>

        {/* Terms info */}
        <div className="text-gray-400 text-sm">
          {selectedOption === "Option 2" ? (
            <p className="italic">Thank you for accepting the terms!</p>
          ) : (
            <p>By accepting these terms, you agree that I can contact you.</p>
          )}
        </div>

        {/* reCAPTCHA */}
        <div
          className="g-recaptcha"
          data-sitekey="6Lf3mhoeAAAAAADJtupMSieOpPauL__WRT7fTO_c"
        ></div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting || selectedOption !== "Option 2"}
          className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition w-full disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
