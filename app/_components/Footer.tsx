import React from "react";

function Footer() {
  return (
    <footer className="bg-black mt-14">
      <div className="text-white container max-w-[1320px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-12">
        <div className=" flex justify-between ">
          <div className=" md:w-1/2 w-full ">
            <div className="lg:col-span-1 md:col-span-1 col-span-2">
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                DealDetector
              </h1>

              <p className="mt-6 text-xl leading-snug max-w-sm">
                Compare Supermarket <br />
                Prices & Save Money
              </p>

              <button className="mt-8 border border-white px-7 py-2 rounded-full hover:bg-white hover:text-black transition text-sm tracking-wide">
                Get started
              </button>
            </div>

            <div className=" flex   justify-between mt-10">
              <div>
                <h3 className="text-lg font-semibold mb-5">Pages</h3>
                <ul className="space-y-3 text-gray-300 text-[15px]">
                  <li>Home</li>
                  <li>Super Market</li>
                  <li>Shop List</li>
                  <li>Favorite</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-5">Support</h3>
                <ul className="space-y-3 text-gray-300 text-[15px]">
                  <li>Contact</li>
                  <li>FAQ</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-5">Download App</h3>
                <div className=" flex flex-col gap-3">
                  <button className="w-40 border border-white py-2 rounded-full mb-4 hover:bg-white hover:text-black transition text-sm tracking-wide">
                    App Store
                  </button>

                  <button className="w-40 border border-white py-2 rounded-full hover:bg-white hover:text-black transition text-sm tracking-wide">
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none select-none w-1/3 md:block hidden">
            <img
              src="/static/images/footer.png"
              alt="decor"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 mt-5 lg:mt-10 border-t border-[#2a2a2a]"></div>
        <div className="mt-8 text-center text-gray-400 text-sm relative z-10">
          Copyright © Interno | Designed by Victorflow Templates - Powered by
          Webflow
        </div>
      </div>
    </footer>
  );
}

export default Footer;
