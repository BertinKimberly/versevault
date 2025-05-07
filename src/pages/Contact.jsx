export const Contact = () => {
   const socialLinks = [
      {
         name: "Email",
         icon: (
            <svg
               className="w-8 h-8"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
               />
            </svg>
         ),
         link: "mailto:contact@versevault.com",
         color: "bg-gradient-to-br from-[#3A59D1] to-[#7dabff]",
      },
      {
         name: "GitHub",
         icon: (
            <img
               src="/images/github.png"
               alt="GitHub"
               className="w-8 h-8"
            />
         ),
         link: "https://github.com/bertinKimberly",
         color: "bg-gradient-to-br from-[#253380] to-[#1c2761]",
      },
      {
         name: "Instagram",
         icon: (
            <svg
               className="w-8 h-8"
               fill="currentColor"
               viewBox="0 0 24 24"
            >
               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
         ),
         link: "https://instagram.com",
         color: "bg-gradient-to-br from-[#5a77de] to-[#3A59D1]",
      },
      {
         name: "Twitter",
         icon: (
            <svg
               className="w-8 h-8"
               fill="currentColor"
               viewBox="0 0 24 24"
            >
               <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
         ),
         link: "https://twitter.com",
         color: "bg-gradient-to-br from-[#7dabff] to-[#3A59D1]",
      },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-b from-[#3A59D1] to-[#253380] text-white pt-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
               <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Get in touch with us through any of our social media channels
                  or email.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {socialLinks.map((social) => (
                  <a
                     key={social.name}
                     href={social.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`${social.color} p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                     <div className="flex flex-col items-center text-center">
                        <div className="text-white mb-4">{social.icon}</div>
                        <h3 className="text-xl font-semibold text-white">
                           {social.name}
                        </h3>
                     </div>
                  </a>
               ))}
            </div>

            <div className="mt-20 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-[#3A59D1] to-[#7dabff] opacity-10 rounded-lg"></div>
               <div className="relative bg-[#253380]/40 border border-[#3A59D1]/50 rounded-lg p-8 backdrop-blur-sm">
                  <div className="text-center">
                     <h2 className="text-2xl font-semibold mb-4 text-[#7dabff]">
                        Send us a Message
                     </h2>
                     <p className="text-gray-200 mb-8">
                        Have questions or feedback? We'd love to hear from you!
                     </p>
                     <a
                        href="mailto:contact@versevault.com"
                        className="inline-block bg-[#3A59D1] hover:bg-[#5a77de] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                     >
                        Send Email
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
