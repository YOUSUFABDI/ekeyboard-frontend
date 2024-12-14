const ContactUs = () => {
    return (
        <section className="bg-gray-100 dark:bg-dark-dark-light py-16 text-black dark:text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
                <p className="text-lg mb-12">We would love to hear from you! Feel free to reach out to us for any inquiries.</p>
                <div className="max-w-xl mx-auto bg-gray-100 dark:bg-dark-dark-light p-8 rounded-lg shadow-lg">
                    <form>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="name" className="text-black dark:text-white">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-black dark:text-white">
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="text-black dark:text-white">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    className="form-textarea w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="Enter your message"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white dark:text-white py-3 rounded-md mt-6 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
